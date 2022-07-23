import formatter from 'currency-formatter';

import cpf from '../helper/cpf.helper';
import { txid } from '../helper/txid.help';
import GerencianetCreatePixAdapter from '../adapter/gerencianet.create.pix.adapter';
import { requestCreatePixDto } from '../dto/request.create.pix.dto';
import { infoAdicionais, responseCreatePixDto } from '../dto/response.create.pix.dto';
import Cobranca from '../entities/cobranca';
import ProcessInfo from '../entities/process.info';

export default class CreateGnPixService {
  constructor(private chave: string, private cobranca: Cobranca) {}
  public async execute(): Promise<responseCreatePixDto | ProcessInfo> {
    try {
      const _sysId = this.cobranca.id;
      const _txid = txid.create();
      const _expiracao = 1600;
      const _valorpix = this.cobranca.parcelas[0].valorParcela;
      const _chave = this.chave;
      const _observacao = this.cobranca.parcelas[0].observacao;
      const _validCpf = cpf(this.cobranca.cliente.cnpjCpf);

      const _infoAdicionais: infoAdicionais[] = [
        { nome: 'sysId', valor: _sysId },
        { nome: 'observações', valor: 'outras observações' },
      ];

      if (!_validCpf) return new ProcessInfo('inválido', 'CPF inválido para o cliente');
      if (!_chave) return new ProcessInfo('inválida', 'Chave inválida ou não informada');

      const request: requestCreatePixDto = {
        sysId: _sysId,
        params: { txid: _txid },
        calendario: { expiracao: _expiracao },
        devedor: { cpf: this.cobranca.cliente.cnpjCpf, nome: this.cobranca.cliente.nomeCliente },
        valor: { original: formatter.format(_valorpix, { code: 'USD', symbol: '' }) },
        chave: _chave!,
        solicitacaoPagador: _observacao,
        infoAdicionais: _infoAdicionais,
      };

      const gerencianetCreatePix = new GerencianetCreatePixAdapter();
      const response = await gerencianetCreatePix.execute(request);
      return response;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
