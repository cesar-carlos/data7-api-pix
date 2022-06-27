import Gerencianet from 'gn-api-sdk-typescript';
import { LocalStorage } from 'node-localstorage';

import Cobranca from '../model/cobranca';
import ContractCredential from '../contracts/contract.credential';
import ContractCredentialPIX from '../contracts/contract.credential.pix';
import Pagamento from '../model/pagamento';
import PagamentoLoc from '../model/pagamento.loc';
import PagamentoQrCode from '../model/pagamento.pix';
import Chave from '../model/chave';
import PagamentoAdicionais from '../model/pagamento.adicionais';

export default class GerencianetCobranca {
  private gerencianet: any;

  constructor(
    private readonly config: ContractCredential | ContractCredentialPIX,
    private readonly cobranca: Cobranca,
  ) {
    this.initialize(config);
  }

  private initialize(config: ContractCredential | ContractCredentialPIX) {
    this.gerencianet = Gerencianet(config as any);
  }

  public async createCobrancaPIX(): Promise<Pagamento | void> {
    if (!this.validCPF(this.cobranca.cliente.cnpjCpf))
      throw new Error('CPF inválido');

    try {
      const params = { txid: this.createTxId() };
      const body = await this.createBodyPIX();
      //const respose = require('../assets/respose.cobranca.json');

      const respose = await this.gerencianet.pixCreateImmediateCharge(
        params,
        body,
      );

      if (respose.status === 'ATIVA') {
        const pagamento = this.mountPagamentoFromResposase(respose);
        return pagamento;
      }
    } catch (error) {
      //todo: implementar log error
      console.log(error);
    }
  }

  public async createQrCodePIX(
    loc?: PagamentoLoc,
  ): Promise<PagamentoQrCode | undefined> {
    try {
      if (!loc) throw new Error('Loc id não informado');

      const params = { id: loc.id };
      const request = await this.gerencianet.pixGenerateQRCode(params);
      const _pagamentoQrCode = PagamentoQrCode.fromJson(request);
      return _pagamentoQrCode;
    } catch (error) {
      //todo: implementar log error
      console.log(error);
    }
  }

  public async getChave(): Promise<Chave | undefined> {
    try {
      const localStorageKeys = this.getLocalStorageKeys();

      if (!localStorageKeys) {
        const request: { chaves: [] } | undefined = await this.listChave();

        if (request) {
          const chaves = request?.chaves.map((key: any) => {
            const stats = 'Ativo';
            const data = new Date();
            return new Chave(stats, data, key);
          });

          this.setLocalStorageKeys(chaves);
          return chaves.shift();
        } else {
          await this.createChave();
          return this.getChave();
        }
      } else {
        const chaves = this.getLocalStorageKeys();
        return chaves?.shift();
      }
    } catch (error) {
      //todo: implementar log error
      console.log(error);
    }
  }

  public async listChave(): Promise<{ chaves: [] } | undefined> {
    try {
      const keys: { chaves: [] } = await this.gerencianet.gnListEvp();
      return keys;
    } catch (error) {
      //todo: implementar log error
      console.log(error);
    }
  }

  private async createBodyPIX(): Promise<any | undefined> {
    const currencyFormatter = require('currency-formatter');

    const token = await this.getChave();
    const valorCobranca = this.cobranca?.parcelas[0]?.valorParcela;
    const observacaoCobranca = this.cobranca?.parcelas[0]?.observacao;

    if (!token) return;
    if (!this.cobranca) return undefined;
    if (!valorCobranca) return undefined;

    const valorCobrancaFormated: string = currencyFormatter.format(
      valorCobranca,
      { code: 'USD', symbol: '' },
    );

    const body = {
      calendario: { expiracao: 3600 },
      devedor: {
        cpf: this.cobranca.cliente.cnpjCpf,
        nome: this.cobranca.cliente.nomeCliente,
      },
      valor: { original: valorCobrancaFormated },
      chave: token.chave,
      solicitacaoPagador: observacaoCobranca.toString(),
      infoAdicionais: [
        {
          nome: 'Id do Pedido',
          valor: this.cobranca.id,
        },
      ],
    };

    return body;
  }

  private async createChave(): Promise<Chave | undefined> {
    try {
      const request = await this.gerencianet.gnCreateEvp();
      const chave = {
        status: 'Ativo',
        dataCriacao: new Date(),
        chave: request.chave,
      } as Chave;

      return chave;
    } catch (error) {
      //todo: implementar log error
      console.log(error);
    }
  }

  private getLocalStorageKeys(): Chave[] | undefined {
    try {
      const path = require('path');
      const dirPath: string = path.join(__dirname, '..', '/LocalStorage');
      const storege = new LocalStorage(dirPath);
      const result = storege.getItem('keys.json');

      if (!result) return undefined;

      const keysJson = JSON.parse(result);
      const keys = keysJson.chaves.map((key: any) => Chave.fromJson(key));
      return keys;
    } catch (error) {
      //todo: implementar log error
      console.log(error);
    }
  }

  private setLocalStorageKeys(keys: Chave[]): void {
    try {
      const path = require('path');
      const dirPath: string = path.join(__dirname, '..', '/LocalStorage');
      const storege = new LocalStorage(dirPath);
      const result = storege.setItem(
        'keys.json',
        JSON.stringify({ chaves: keys }),
      );
    } catch (error) {
      //todo: implementar log error
      console.log(error);
    }
  }

  private validCPF(cpf: string): boolean {
    const regExp = new RegExp('^[0-9]{11}$');
    return regExp.test(cpf);
  }

  private validTxId(txId: string): boolean {
    const regExp = new RegExp('^[a-zA-Z0-9]{26,35}$');
    return regExp.test(txId);
  }

  private createTxId(): string {
    return 'xxxxxxxxxxxxx4xxxxyxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  private mountPagamentoFromResposase(respose: any) {
    const moment = require('moment');

    const minutesForExpiret = +respose.calendario.expiracao / 60;
    const createDate = moment(respose.calendario.criacao).toDate();
    const expiretDate = moment(respose.calendario.criacao)
      .add(minutesForExpiret, 'minutes')
      .toDate();

    const mount = {
      id: this.cobranca.id,
      txid: respose.txid,
      chave: respose.chave,
      status: respose.status,
      criacao: createDate,
      expiracao: expiretDate,
      valor: respose.valor.original,
      solicitacaoPagador: respose.solicitacaoPagador,
      adicionais: respose.infoAdicionais?.map((adicional: any) => {
        return new PagamentoAdicionais(adicional.nome, adicional.valor);
      }),
      loc: new PagamentoLoc(
        respose.loc.id,
        respose.loc.location,
        respose.loc.tipoCob,
        respose.loc.criacao,
      ),
    };

    const pagamento = Pagamento.fromObject(mount);
    return pagamento;
  }
}
