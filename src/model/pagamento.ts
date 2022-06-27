import Cliente from './cliente';
import PagamentoAdicionais from './pagamento.adicionais';
import PagamentoLoc from './pagamento.loc';
import PagamentoQrCode from './pagamento.pix';

export default class Pagamento {
  //create constructor initialize properties
  constructor(
    readonly id: string,
    readonly txid: string,
    readonly chave: string,
    readonly status: string,
    readonly criacao: Date,
    readonly expiracao: Date,
    readonly valor: number,
    readonly solicitacaoPagador: string,
    readonly adicionais: PagamentoAdicionais[],
    readonly loc: PagamentoLoc,
  ) {}

  //create method from object
  static fromObject(obj: any): Pagamento {
    return new Pagamento(
      obj.id,
      obj.txid,
      obj.chave,
      obj.status,
      obj.criacao,
      obj.expiracao,
      obj.valor,
      obj.solicitacaoPagador,
      obj.adicionais.map((adicional: any) =>
        PagamentoAdicionais.fromObject(adicional),
      ),
      PagamentoLoc.fromObject(obj.loc),
    );
  }

  //create method from json
  static fromJson(json: any): Pagamento {
    return new Pagamento(
      json.Id,
      json.Txid,
      json.Chave,
      json.Status,
      json.Criacao,
      json.Expiracao,
      json.Valor,
      json.SolicitacaoPagador,
      json.Adicionais.map((adicional: any) =>
        PagamentoAdicionais.fromJson(adicional),
      ),
      PagamentoLoc.fromJson(json.Loc),
    );
  }

  //create method to json
  toJson(): any {
    return {
      Id: this.id,
      Txid: this.txid,
      Chave: this.chave,
      Status: this.status,
      Criacao: this.criacao,
      Expiracao: this.expiracao,
      Valor: this.valor,
      SolicitacaoPagador: this.solicitacaoPagador,
      Adicionais: this.adicionais.map((adicional: PagamentoAdicionais) =>
        adicional.toJson(),
      ),
      Loc: this.loc.toJson(),
    };
  }
}
