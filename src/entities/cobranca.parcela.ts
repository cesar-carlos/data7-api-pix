export default class CobrancaParcela {
  constructor(
    //readonly id: string,
    //readonly IdCobranca: string,
    readonly origem: string,
    readonly codOrigem: string,
    readonly numeroParcela: string,
    readonly codFormaPagamento: string,
    readonly dataEmissao: string,
    readonly dataVenda: string,
    readonly dataVencimento: string,
    readonly valorBruto: number,
    readonly valorLiquido: number,
    readonly valorParcela: number,
    readonly observacao: string,
  ) {}

  //create method from json
  static fromJson(json: any): CobrancaParcela {
    return new CobrancaParcela(
      // json.id || json.Id,
      // json.idCobranca || json.IdCobranca,
      json.origem || json.Origem,
      json.codOrigem || json.CodOrigem,
      json.numeroParcela || json.NumeroParcela,
      json.codFormaPagamento || json.CodFormaPagamento,
      json.dataEmissao || json.DataEmissao,
      json.dataVenda || json.DataVenda,
      json.dataVencimento || json.DataVencimento,
      json.valorBruto || json.ValorBruto,
      json.valorLiquido || json.ValorLiquido,
      json.valorParcela || json.ValorParcela,
      json.observacao || json.Observacao,
    );
  }

  //create method to json
  toJson(): any {
    return {
      // id: this.id,
      // IdCobranca: this.IdCobranca,
      Origem: this.origem,
      CodOrigem: this.codOrigem,
      NumeroParcela: this.numeroParcela,
      CodFormaPagamento: this.codFormaPagamento,
      DataEmissao: this.dataEmissao,
      DataVenda: this.dataVenda,
      DataVencimento: this.dataVencimento,
      ValorBruto: this.valorBruto,
      ValorLiquido: this.valorLiquido,
      ValorParcela: this.valorParcela,
      Observacao: this.observacao,
    };
  }

  //create method from object
  static fromObject(obj: any): CobrancaParcela {
    return new CobrancaParcela(
      // obj.id || obj.Id,
      // obj.idCobranca || obj.IdCobranca,
      obj.origem || obj.Origem,
      obj.codOrigem || obj.CodOrigem,
      obj.numeroParcela || obj.NumeroParcela,
      obj.codFormaPagamento || obj.CodFormaPagamento,
      obj.dataEmissao || obj.DataEmissao,
      obj.dataVenda || obj.DataVenda,
      obj.dataVencimento || obj.DataVencimento,
      obj.valorBruto || obj.ValorBruto,
      obj.valorLiquido || obj.ValorLiquido,
      obj.valorParcela || obj.ValorParcela,
      obj.observacao || obj.Observacao,
    );
  }
}
