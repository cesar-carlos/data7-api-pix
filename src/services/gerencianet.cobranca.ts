import Gerencianet from 'gn-api-sdk-typescript';
import { LocalStorage } from 'node-localstorage';

import Cobranca from '../model/cobranca';
import ContractCredential from '../contracts/contract.credential';
import ContractCredentialPIX from '../contracts/contract.credential.pix';
import Pagamento from '../model/pagamento';
import PagamentoLoc from '../model/pagamento.loc';
import PagamentoQrCode from '../model/pagamento.qrcode';
import Chave from '../model/chave';

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
    const params = { txid: this.createTxId() };
    const body = await this.createBodyPIX();

    if (!this.validCPF(this.cobranca.cliente.cnpjCpf))
      throw new Error('CPF inválido');

    if (!this.validTxId(params.txid)) throw new Error('TxId inválido');

    if (!body) throw new Error('Body inválido');

    try {
      const result = await this.gerencianet.pixCreateImmediateCharge(
        params,
        body,
      );

      if (result.status === 'success') {
        const _pagamento = Pagamento.fromJson(result);
        console.log(_pagamento);
        return _pagamento;
      }

      //const qrCode = await this.createQrCode(loc);
      //console.log(qrCode);
    } catch (error) {
      //todo: implementar log error
      console.log(error);
    }
  }

  public async createQrCode(
    loc: PagamentoLoc,
  ): Promise<PagamentoQrCode | undefined> {
    try {
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
        const request: { chaves: [] } | undefined = await this.listKeys();

        const chaves = request?.chaves.map((key: any) => {
          const stats = 'Ativo';
          const data = new Date();
          return new Chave(stats, data, key);
        });

        //persist keys localStorage and return first key
        this.setLocalStorageKeys(chaves as Chave[]);
        return chaves?.shift();
      }

      //method not tested (deve esta funcionando)
      return await this.createChave();
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

  public async listKeys(): Promise<{ chaves: [] } | undefined> {
    try {
      const keys: { chaves: [] } = await this.gerencianet.gnListEvp();
      return keys;
    } catch (error) {
      //todo: implementar log error
      console.log(error);
    }
  }

  private async createBodyPIX(): Promise<any | undefined> {
    const token = await this.getChave();
    const valorCobranca = this.cobranca?.parcelas[0]?.valorParcela;
    const observacaoCobranca = this.cobranca?.parcelas[0]?.observacao;

    if (!token) return;
    if (!this.cobranca) return undefined;
    if (!valorCobranca) return undefined;

    const body = {
      calendario: { expiracao: 3600 },
      devedor: {
        cpf: this.cobranca.cliente.cnpjCpf,
        nome: this.cobranca.cliente.nomeCliente,
      },
      valor: { original: valorCobranca.toString() },
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
}
