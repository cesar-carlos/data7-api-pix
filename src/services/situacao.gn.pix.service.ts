import GerencianetPixDetail from '../adapter/gerencianet.pix.detail.adapter';
import PagamentoSituacao from '../entities/pagamento.situacao';

export default class SituacaoGnPixService {
  private pixDetail = new GerencianetPixDetail();
  constructor(private readonly txid: string) {}
  public async execute(txid: string): Promise<PagamentoSituacao> {
    try {
      const respose = await this.pixDetail.execute(txid);
      const situacao = new PagamentoSituacao(
        respose.txid,
        respose.loc.id,
        'SysId',
        'endToEndId',
        respose.status,
        respose.chave,
        respose.devedor,
        respose.calendario.criacao,
        null, //dataFechamento
      );

      return situacao;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
