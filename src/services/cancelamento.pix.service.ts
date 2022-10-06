import { STATUS } from '../type/status';

import CobrancaPix from '../entities/cobranca.pix';
import ContractBaseRepository from '../contracts/base.repository.contract';
import CobrancaDigitalTituloDto from '../dto/cobranca.digital.titulo.dto';
import LocalBaseRepositoryContract from '../contracts/local.base.repository.contract';
import console from 'console';

export default class CancelamentoPixService {
  private localRepository: LocalBaseRepositoryContract<CobrancaDigitalTituloDto>;
  private onlineRepository: ContractBaseRepository<CobrancaPix>;

  constructor(
    localRepository: LocalBaseRepositoryContract<CobrancaDigitalTituloDto>,
    onlineRepository: ContractBaseRepository<CobrancaPix>,
  ) {
    this.localRepository = localRepository;
    this.onlineRepository = onlineRepository;
  }

  public async execute(params: { sysId: string; status: string }): Promise<void> {
    //CANCELADO-CLIENTE
    if (params.status === 'CC') {
      const titulos = await this.localRepository.selectWhere([{ key: 'SysId ', value: params.sysId }]);
      titulos?.forEach(async (titulo) => {
        const upTitulo = new CobrancaDigitalTituloDto({
          codEmpresa: titulo.codEmpresa,
          codCobrancaDigital: titulo.codCobrancaDigital,
          item: titulo.item,
          sysId: titulo.sysId,
          status: params.status,
          tipoCobranca: titulo.tipoCobranca,
          numeroTitulo: titulo.numeroTitulo,
          parcela: titulo.parcela,
          qtdParcelas: titulo.qtdParcelas,
          liberacaoKey: titulo.liberacaoKey,
          dataLancamento: titulo.dataLancamento,
          dataEmissao: titulo.dataEmissao,
          dataVenda: titulo.dataVenda,
          dataVencimento: titulo.dataVencimento,
          valor: titulo.valor,
          observacao: titulo.observacao,
        });

        await this.localRepository.update(upTitulo);
      });
    }

    //CANCELADO-SISTEMA
    if (params.status === 'CS') {
      const titulo = await this.onlineRepository.find(params.sysId);

      if (titulo) {
        if (titulo.STATUS === STATUS.ATIVO) {
          titulo.STATUS = STATUS.CANCELADO_SISTEMA;
          await this.onlineRepository.update(titulo);
        }
      }
    }
  }
}
