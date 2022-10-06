import CFP from '../helper/cpf.helper';
import CNPJ from '../helper/cnpj.helper';

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
      const cnpj = CNPJ(cobranca.cliente.cnpj_cpf);
      let tipoEntidade = '';

      if (cobranca.cliente.cnpj_cpf.length === 11 && !cpf.isValid()) {
        const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
        return new ProcessInfo(infoStatusErro, 'CobrancaPixService', `CPF INVALIDO: ${cobranca.cliente.cnpj_cpf}`);
      }

      if (cobranca.cliente.cnpj_cpf.length === 14 && !cnpj.isValid()) {
        const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
        return new ProcessInfo(infoStatusErro, 'CobrancaPixService', `CNPJ INVALIDO: ${cobranca.cliente.cnpj_cpf}`);
      }

      if (cobranca.cliente.cnpj_cpf.length !== 11 && cobranca.cliente.cnpj_cpf.length !== 14) {
        const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
        return new ProcessInfo(infoStatusErro, 'CobrancaPixService', `CNPJ/CPF INVALIDO: ${cobranca.cliente.cnpj_cpf}`);
      }

      return cobranca;
    } catch (error: any) {
      const infoStatusError: ProcessInfoStatusType = { status: 'error' };
      return new ProcessInfo(infoStatusError, 'CobrancaPixService', error.message);
    }
  }
}
