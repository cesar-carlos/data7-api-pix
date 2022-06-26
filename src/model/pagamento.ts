import Cliente from './cliente';
import PagamentoAdicionais from './pagamento.adicionais';
import PagamentoLoc from './pagamento.loc';
import PagamentoQrCode from './pagamento.qrcode';

export default class Pagamento {
  //create constructor initialize properties
  constructor(
    readonly id: string,
    readonly txid: string,
    readonly chave: string,
    readonly cliente: Cliente,
    readonly status: string,
    readonly criacao: Date,
    readonly expiracao: Date,
    readonly valor: number,
    readonly solicitacaoPagador: string,
    readonly adicionais: PagamentoAdicionais[],
    readonly loc: PagamentoLoc,
    readonly qrcode?: PagamentoQrCode,
  ) {}

  //create method from json
  static fromJson(json: any): Pagamento {
    return new Pagamento(
      json.Id,
      json.Txid,
      json.Chave,
      Cliente.fromJson(json.Cliente),
      json.Status,
      json.Criacao,
      json.Expiracao,
      json.Valor,
      json.SolicitacaoPagador,
      json.Adicionais.map((adicional: any) =>
        PagamentoAdicionais.fromJson(adicional),
      ),
      PagamentoLoc.fromJson(json.Loc),
      json.Qrcode ? PagamentoQrCode.fromJson(json.Qrcode) : undefined,
    );
  }

  //create method to json
  toJson(): any {
    return {
      Id: this.id,
      Txid: this.txid,
      Chave: this.chave,
      Cliente: this.cliente.toJson(),
      Status: this.status,
      Criacao: this.criacao,
      Expiracao: this.expiracao,
      Valor: this.valor,
      SolicitacaoPagador: this.solicitacaoPagador,
      Adicionais: this.adicionais.map((adicional: PagamentoAdicionais) =>
        adicional.toJson(),
      ),
      Loc: this.loc.toJson(),
      Qrcode: this.qrcode ? this.qrcode.toJson() : undefined,
    };
  }
}
