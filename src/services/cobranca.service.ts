import CFP from '../helper/cpf.helper';

import { requestCobrancaDto } from '../dto/request.cobranca.dto';
import { ProcessInfoStatusType } from '../type/process.info.status.type';

import Cobranca from '../entities/cobranca';
import ProcessInfo from '../entities/process.info';
import ChaveDto from '../dto/chave.dto';

export default class CobrancaService {
  constructor(private readonly chave: ChaveDto) {}
  public async executar(cobrancaDto: requestCobrancaDto): Promise<ProcessInfo | Cobranca> {
    try {
      //COBRANCA LIBERADA SOMENTE PARA PESSOA FISICA
      const cobranca = Cobranca.fromRequestCobrancaDto(this.chave.chave, cobrancaDto);
      const cpf = CFP(cobranca.cliente.cnpj_cpf);
      if (!cpf.isValid()) {
        const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
        return new ProcessInfo(infoStatusErro, 'CobrancaPixService', `CPF INVALIDO: ${cobranca.cliente.cnpj_cpf}`);
      }

      return cobranca;
    } catch (error: any) {
      const infoStatusError: ProcessInfoStatusType = { status: 'error' };
      return new ProcessInfo(infoStatusError, 'CobrancaPixService', error.message);
    }
  }
}
