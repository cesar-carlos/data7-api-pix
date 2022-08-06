import { requestCobrancaSe7eDto } from '../dto/request.cobranca.se7e.dto';
import CFP from '../helper/cpf.helper';

import Chave from '../entities/chave';
import Cobranca from '../entities/cobranca';
import ProcessInfo from '../entities/process.info';

import { ProcessInfoStatusType } from '../type/process.info.status.type';

export default class CobrancaService {
  constructor(private readonly chave: Chave) {}
  public async executar(cobrancaDto: requestCobrancaSe7eDto): Promise<ProcessInfo | Cobranca> {
    try {
      const cobranca = Cobranca.fromRequestCobrancaSe7eDto(this.chave.chave, cobrancaDto);
      const cpf = CFP(cobranca.cliente.cnpjCpf);
      if (!cpf.isValid()) {
        const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
        return new ProcessInfo(infoStatusErro, 'CobrancaPixService', 'CPF INVALIDO');
      }

      return cobranca;
    } catch (error: any) {
      const infoStatusError: ProcessInfoStatusType = { status: 'error' };
      return new ProcessInfo(infoStatusError, 'CobrancaPixService', error.message);
    }
  }
}
