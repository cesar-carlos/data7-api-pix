import { STATUS } from '../type/status';

import { DadosCobranca } from 'data7-pix/dist/types/cobranca';
import { requestCreatePixDTO } from '../dto/request.create.pix.dto';
import { responseCreatePixDto } from '../dto/response.create.pix.dto';

import SicrediBase from './sicredi.base';
import CreatePixApiContract from '../contracts/create.pix.api.contract';

export default class SicrediCreatePixAdapter extends SicrediBase implements CreatePixApiContract {
  public async execute(request: requestCreatePixDTO): Promise<responseCreatePixDto> {
    try {
      const data = this.requestData(request);
      const resp = await this.sicredi.criar_cobranca(data);

      const result: responseCreatePixDto = {
        sysId: request.sysId,
        calendario: {
          criacao: new Date(resp.criacao),
          expiracao: resp.expiracao,
        },

        txid: request.params.txid,
        revisao: resp.revisao,

        location: '',
        status: STATUS.ATIVO,
        devedor: {
          cnpj_cpf: resp.devedor?.cpf ? resp.devedor?.cpf : resp.devedor?.cnpj,
          nome: resp.devedor?.nome ? resp.devedor.nome : '',
        },

        valor: { original: resp.valor },
        chave: resp.chave,
        solicitacaoPagador: resp.solicitacaoPagador ?? '',
        infoAdicionais: resp.infoAdicionais ?? [],
        qrcode: resp.pix_copia_e_cola,
        imagemQrcode: resp.qrcode_base64,
      };

      return result;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.mensagem);
    }
  }

  private requestData(request: requestCreatePixDTO): DadosCobranca {
    const cnpj_cpf = request.devedor.cnpj_cpf.replace(/\D/g, '');
    if (cnpj_cpf.length === 11 && cnpj_cpf !== '00000000000') {
      return {
        tx_id: request.params.txid,
        expiracao: request.calendario.expiracao,
        devedor: { cpf: cnpj_cpf, nome: request.devedor.nome },
        valor: request.valor.original,
        solicitacaoPagador: request.solicitacaoPagador,
        infoAdicionais: request.infoAdicionais,
      };
    }

    if (cnpj_cpf.length === 14) {
      return {
        tx_id: request.params.txid,
        expiracao: request.calendario.expiracao,
        devedor: { cnpj: cnpj_cpf, nome: request.devedor.nome },
        valor: request.valor.original,
        solicitacaoPagador: request.solicitacaoPagador,
        infoAdicionais: request.infoAdicionais,
      };
    }

    return {
      tx_id: request.params.txid,
      expiracao: request.calendario.expiracao,
      valor: request.valor.original,
      solicitacaoPagador: request.solicitacaoPagador,
      infoAdicionais: request.infoAdicionais,
    };
  }
}
