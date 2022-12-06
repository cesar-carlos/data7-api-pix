import { STATUS } from '../type/status';
import { requestCreatePixDTO } from '../dto/request.create.pix.dto';
import { responseCreatePixDto } from '../dto/response.create.pix.dto';

import GerencianetBase from './gerencianet.base';
import CreatePixApiContract from '../contracts/create.pix.api.contract';
import GerencianetCreateQrcodePixAdapter from './gerencianet.create.qrcode.pix.adapter';

export default class GerencianetCreatePixAdapter extends GerencianetBase implements CreatePixApiContract {
  public async execute(request: requestCreatePixDTO): Promise<responseCreatePixDto> {
    try {
      const params = request.params;
      const body = this.requestData(request);
      const resp = await this.gerencianet.pixCreateImmediateCharge(params, body);

      const createQrcodePix = new GerencianetCreateQrcodePixAdapter();
      const qrcodePix = await createQrcodePix.execute(resp.loc.id);

      const _responseCreatePixDto: responseCreatePixDto = {
        sysId: request.sysId,
        calendario: {
          criacao: new Date(resp.calendario.criacao),
          expiracao: resp.calendario.expiracao,
        },

        txid: request.params.txid,
        revisao: resp.revisao,

        location: resp.location,
        status: STATUS.ATIVO,
        devedor: {
          cnpj_cpf: request.devedor.cnpj_cpf,
          nome: request.devedor.nome,
        },

        valor: { original: resp.valor.original },
        chave: resp.chave,
        solicitacaoPagador: resp.solicitacaoPagador ?? '',
        infoAdicionais: resp.infoAdicionais ?? [],
        qrcode: qrcodePix.qrcode,
        imagemQrcode: qrcodePix.imagemQrcode,
      };

      return _responseCreatePixDto;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.mensagem);
    }
  }

  private requestData(request: requestCreatePixDTO) {
    if (request.devedor.cnpj_cpf.length === 11 && request.devedor.cnpj_cpf !== '00000000000') {
      return {
        calendario: { expiracao: request.calendario.expiracao },
        devedor: { cpf: request.devedor.cnpj_cpf, nome: request.devedor.nome },
        valor: { original: request.valor.original },
        chave: this.config.chave_pix,
        solicitacaoPagador: request.solicitacaoPagador,
        infoAdicionais: request.infoAdicionais,
      };
    }

    if (request.devedor.cnpj_cpf.length === 14) {
      return {
        calendario: { expiracao: request.calendario.expiracao },
        devedor: { cnpj: request.devedor.cnpj_cpf, nome: request.devedor.nome },
        valor: { original: request.valor.original },
        chave: this.config.chave_pix,
        solicitacaoPagador: request.solicitacaoPagador,
        infoAdicionais: request.infoAdicionais,
      };
    }

    return {
      calendario: { expiracao: request.calendario.expiracao },
      valor: { original: request.valor.original },
      chave: this.config.chave_pix,
      solicitacaoPagador: request.solicitacaoPagador,
      infoAdicionais: request.infoAdicionais,
    };
  }
}
