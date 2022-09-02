import formatter from 'currency-formatter';
import moment from 'moment';

import { txid } from '../helper/txid.help';
import { ProcessInfoStatusType } from '../type/process.info.status.type';

import GerencianetCreatePixAdapter from '../adapter/gerencianet.create.pix.adapter';
import Cobranca from '../entities/cobranca';
import ProcessInfo from '../entities/process.info';
import cpf from '../helper/cpf.helper';
import PagamentoPendente, { devedor } from '../entities/pagamento.pendente';
import PagamentoLoc from '../entities/pagamento.loc';
import PagamentoAdicionais from '../entities/pagamento.adicionais';

export default class CreateGnPixService {
  constructor(private chave: string) {}
  public async execute(cobranca: Cobranca): Promise<PagamentoPendente[] | ProcessInfo> {
    const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
    const infoStatusSuccess: ProcessInfoStatusType = { status: 'success' };

    const CPF = cpf(cobranca.cliente.cnpj_cpf);
    const chave = this.chave;

    if (!CPF.isValid()) {
      return new ProcessInfo(infoStatusErro, 'CreateGnPixService', 'CPF inválido para o cliente');
    }

    if (!chave) {
      return new ProcessInfo(infoStatusErro, 'CreateGnPixService', 'Chave inválida ou não informada');
    }

    //OPEN
    const timeExp = 1600;
    const bodyCreatePix = cobranca.parcelas.map((parcela) => {
      return {
        sysId: parcela.sysId,
        params: { txid: txid.create() },
        calendario: { expiracao: timeExp },
        devedor: { cpf: cobranca.cliente.cnpj_cpf, nome: cobranca.cliente.nomeCliente },
        valor: { original: formatter.format(parcela.valorParcela, { code: 'USD', symbol: '' }) },
        chave: chave,
        solicitacaoPagador: parcela.observacao,
        infoAdicionais: [
          { nome: 'sysId', valor: parcela.sysId },
          { nome: 'observações', valor: 'outras observações' },
        ],
      };
    });

    //TODO: CREATE TRANSACTION TO COMPLITED PROCESS
    const gnCreatePix = new GerencianetCreatePixAdapter();
    const pgtoPendentes = [];
    for (const bodyCreate of bodyCreatePix) {
      try {
        const date = new Date().toISOString();
        const dateExp = moment(date).add(timeExp, 'minute').toISOString();
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
