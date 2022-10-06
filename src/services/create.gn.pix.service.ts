import formatter from 'currency-formatter';
import moment from 'moment';

import { txid } from '../helper/txid.help';
import { ProcessInfoStatusType } from '../type/process.info.status.type';

import Cobranca from '../entities/cobranca';
import ProcessInfo from '../entities/process.info';

import PagamentoLoc from '../entities/pagamento.loc';
import PagamentoPendente from '../entities/pagamento.pendente';
import GerencianetCreatePixAdapter from '../adapter/gerencianet.create.pix.adapter';
import PagamentoAdicionais from '../entities/pagamento.adicionais';

export default class CreateGnPixService {
  private timeExp = 3600;
  constructor(private chave: string) {}

  public async execute(cobranca: Cobranca): Promise<PagamentoPendente[] | ProcessInfo> {
    const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
    const bodyCreatePix = cobranca.parcelas.map((parcela) => {
      return {
        sysId: parcela.sysId,
        params: { txid: txid.create() },
        calendario: { expiracao: this.timeExp },
        devedor: { cnpj_cpf: cobranca.cliente.cnpj_cpf, nome: cobranca.cliente.nomeCliente },
        valor: { original: formatter.format(parcela.valorParcela, { code: 'USD', symbol: '' }) },
        chave: this.chave,
        solicitacaoPagador: parcela.observacao,
        infoAdicionais: [
          { nome: 'sysId', valor: parcela.sysId },
          { nome: 'observações', valor: 'outras observações' },
        ],
      };
    });

    //TODO: CREATE TRANSACTION TO COMPLITED PROCESS
    const pgtoPendentes = [];
    for (const bodyCreate of bodyCreatePix) {
      try {
        const gnCreatePix = new GerencianetCreatePixAdapter();
        const date = new Date().toISOString();
        const dateExp = moment(date).add(this.timeExp, 'minute').toISOString();
        const resp = await gnCreatePix.execute(bodyCreate);

        const pgtoPendente = new PagamentoPendente(
          resp.txid,
          bodyCreate.sysId,
          resp.chave,
          resp.status,
          resp.devedor,
          new Date(date),
          new Date(dateExp),
          resp.valor.original,
          resp.solicitacaoPagador,
          new PagamentoLoc(resp.loc.id, resp.loc.location, resp.loc.tipoCob, new Date(resp.loc.criacao)),
          resp.infoAdicionais.map((info) => PagamentoAdicionais.create(info)),
        );

        pgtoPendentes.push(pgtoPendente);
      } catch (error: any) {
        return new ProcessInfo(infoStatusErro, 'CreateGnQrcodeService', error.message);
      }
    }

    //VIDA QUE SEGUE
    return pgtoPendentes;
  }
}
