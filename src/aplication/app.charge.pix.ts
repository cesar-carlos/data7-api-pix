import { eContext } from '../dependency/container.dependency';
import { requestCobrancaDto } from '../dto/request.cobranca.dto';

import ProcessInfo from '../entities/process.info';
import CobrancaPix from '../entities/cobranca.pix';
import ResponseInfoDto from '../dto/response.info.dto';
import CobrancaDigitalPixDto from '../dto/cobranca.digital.pix.dto';
import ContractBaseRepository from '../contracts/base.repository.contract';
import LocalBaseRepositoryContract from '../contracts/local.base.repository.contract';

import CobrancaPixService from '../services/cobranca.pix.service';
import CobrancaService from '../services/cobranca.service';

import AppChargeKey from './app.charge.key';
import AppDependencys from './app.dependencys';
import responseInfoDto from '../dto/response.info.dto';

export default class AppChargePix {
  private provedor: string = process.env.PROVEDOR || '';

  constructor(private requestCobrancas: requestCobrancaDto[]) {}

  public async execute(): Promise<responseInfoDto | undefined> {
    for (const cobranca of this.requestCobrancas) {
      const appChargeKey = await AppChargeKey.get();

      if (appChargeKey instanceof ResponseInfoDto) {
        const responseInfoDto = new ResponseInfoDto({
          info: 'INFO-REQUEST',
          message: appChargeKey.info || '',
          statusCode: 400,
        });

        return responseInfoDto;
      }

      const cobrancaService = new CobrancaService(appChargeKey);
      const processInfoOrCobranca = await cobrancaService.executar(cobranca);

      if (processInfoOrCobranca instanceof ProcessInfo) {
        const responseInfoDto = new ResponseInfoDto({
          info: 'INFO-REQUEST',
          message: processInfoOrCobranca.info || '',
          statusCode: 400,
        });

        return responseInfoDto;
      }

      //START CREATE PIX - DEPENDENCIAS
      const cobOnlineRepo = AppDependencys.resolve<ContractBaseRepository<CobrancaPix>>({
        context: eContext.fireBase,
        bind: 'ContractBaseRepository<CobrancaPix>',
      });

      const cobLocalRepo = AppDependencys.resolve<LocalBaseRepositoryContract<CobrancaDigitalPixDto>>({
        context: this.provedor.toLocaleLowerCase() === 'sybase' ? eContext.sybase : eContext.sql_server,
        bind: 'LocalBaseRepositoryContract<CobrancaDigitalPixDto>',
      });

      const cobrancaPixService = new CobrancaPixService(cobLocalRepo, cobOnlineRepo);
      const processInfoOrCobrancaPix = await cobrancaPixService.execute(processInfoOrCobranca);

      //ERROR
      if (processInfoOrCobrancaPix instanceof ProcessInfo) {
        const rsponseInfoDto = new ResponseInfoDto({
          info: 'INFO-REQUEST',
          message: processInfoOrCobrancaPix.info || '',
          statusCode: 400,
        });

        return rsponseInfoDto;
      }
    }
  }
}
