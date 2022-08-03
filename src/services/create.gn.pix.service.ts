import formatter from 'currency-formatter';

import GerencianetCreatePixAdapter from '../adapter/gerencianet.create.pix.adapter';
import Cobranca from '../entities/cobranca';
import ProcessInfo from '../entities/process.info';
import cpf from '../helper/cpf.helper';

import { txid } from '../helper/txid.help';
import { requestCreatePixDto } from '../dto/request.create.pix.dto';
import { infoAdicionais } from '../dto/response.create.pix.dto';
import { ProcessInfoStatusType } from '../type/process.info.status.type';
import PagamentoPendente, { devedor } from '../entities/pagamento.pendente';
import PagamentoLoc from '../entities/pagamento.loc';
import PagamentoAdicionais from '../entities/pagamento.adicionais';

export default class CreateGnPixService {
  constructor(private chave: string) {}
  public async execute(cobranca: Cobranca): Promise<PagamentoPendente | ProcessInfo> {
    try {
      const _sysId = cobranca.id;
      const _txid = txid.create();
      const _expiracao = 1600;
      const _valorpix = cobranca.parcelas[0].valorParcela;
      const _chave = this.chave;
      const _observacao = cobranca.parcelas[0].observacao;
      const CPF = cpf(cobranca.cliente.cnpjCpf);
      const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
      const infoStatusSuccess: ProcessInfoStatusType = { status: 'success' };

      const _infoAdicionais: infoAdicionais[] = [
        { nome: 'sysId', valor: _sysId },
        { nome: 'observações', valor: 'outras observações' },
      ];

      if (!CPF.isValid()) {
        return new ProcessInfo(infoStatusErro, 'CreateGnPixService', 'CPF inválido para o cliente');
      }

      if (!_chave) {
        return new ProcessInfo(infoStatusErro, 'CreateGnPixService', 'Chave inválida ou não informada');
      }

      const request: requestCreatePixDto = {
        sysId: _sysId,
        params: { txid: _txid },
        calendario: { expiracao: _expiracao },
        devedor: { cpf: cobranca.cliente.cnpjCpf, nome: cobranca.cliente.nomeCliente },
        valor: { original: formatter.format(_valorpix, { code: 'USD', symbol: '' }) },
        chave: _chave,
        solicitacaoPagador: _observacao,
        infoAdicionais: _infoAdicionais,
      };

      const gerencianetCreatePix = new GerencianetCreatePixAdapter();
      const response = await gerencianetCreatePix.execute(request);

      const rSysID = response?.infoAdicionais[0]?.valor;
      const rTxid = response.txid;
      const rChave = response.chave;
      const rStatus = response.status;
      const rDevedor: devedor = { cpf: response.devedor.cpf, nome: response.devedor.nome };
      const rDataCriacao = new Date(response.calendario.criacao);
      const rDataExpiracao = new Date(rDataCriacao.setSeconds(response.calendario.expiracao));
      const rValorOriginal = Number.parseFloat(response.valor.original);
      const rSolicitacaoPagador = response.solicitacaoPagador;
      const rPagamentoLoc = new PagamentoLoc(
        response.loc.id,
        response.loc.location,
        response.loc.tipoCob,
        response.loc.criacao,
      );
      const rPagamentoAdicionais = response.infoAdicionais.map((item) => {
        return new PagamentoAdicionais(item.nome, item.valor);
      });

      const pagamentoPendente = new PagamentoPendente(
        rTxid,
        rSysID,
        rChave,
        rStatus,
        rDevedor,
        rDataCriacao,
        rDataExpiracao,
        rValorOriginal,
        rSolicitacaoPagador,
        rPagamentoLoc,
        rPagamentoAdicionais,
      );

      return pagamentoPendente;
    } catch (error: any) {
      const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
      return new ProcessInfo(infoStatusErro, 'CreateGnQrcodeService', error.message);
    }
  }
}
