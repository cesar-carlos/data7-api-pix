import { STATUS } from './../type/status';
import GerencianetPixDetailAdapter from '../adapter/gerencianet.pix.detail.adapter';
import { STATUS_GN } from '../dto/response.pix.detail.dto';
import PagamentoPix from '../entities/pagamento.pix';
import PagamentoSituacao from '../entities/pagamento.situacao';

export default class SituacaoGnPixService {
  private pixDetail = new GerencianetPixDetailAdapter();
  constructor() {}
  public async execute(txid: string): Promise<PagamentoSituacao> {
    try {
      const response = await this.pixDetail.execute(txid);
      const pix = response?.pix?.map((pix) => {
        return new PagamentoPix(
          pix.txid,
          pix.endToEndId,
          pix.chave,
          pix.horario,
          Number.parseFloat(pix.valor),
          pix.infoPagador,
        );
      });

      //sempre da primeira posição enviar sysId
      let _status = STATUS.ATIVO;
      switch (response.status) {
        case STATUS_GN.CONCLUIDA:
          _status = STATUS.CONCLUIDO;
          break;
        case STATUS_GN.ATIVA:
          _status = STATUS.ATIVO;
          break;
      }

      const sysId = response?.infoAdicionais[0]?.valor;
      const pagamentoSituacao = new PagamentoSituacao(
        response.txid,
        sysId,
        response.loc.id,
        _status,
        response.chave,
        response.devedor,
        response.loc.criacao,
        response.loc.location,
        Number.parseFloat(response.valor.original),
        pix,
      );

      return pagamentoSituacao;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
