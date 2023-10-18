export default class ExpedicaoSetorEstoqueDto {
  CodSetorEstoque: number;
  Descricao: string;
  Ativo: string;

  constructor(params: { CodSetorEstoque: number; Descricao: string; Ativo: string }) {
    this.CodSetorEstoque = params.CodSetorEstoque;
    this.Descricao = params.Descricao;
    this.Ativo = params.Ativo;
  }

  static fromObject(object: any): ExpedicaoSetorEstoqueDto {
    return new ExpedicaoSetorEstoqueDto({
      CodSetorEstoque: object.CodSetorEstoque,
      Descricao: object.Descricao,
      Ativo: object.Ativo,
    });
  }
}
