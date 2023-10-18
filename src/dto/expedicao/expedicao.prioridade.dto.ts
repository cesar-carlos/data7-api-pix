export default class ExpedicaoPrioridadeDto {
  CodPrioridade: number;
  Descricao: string;
  Prioridade: number;
  Ativo: string;

  constructor(params: { CodPrioridade: number; Descricao: string; Prioridade: number; Ativo: string }) {
    this.CodPrioridade = params.CodPrioridade;
    this.Descricao = params.Descricao;
    this.Prioridade = params.Prioridade;
    this.Ativo = params.Ativo;
  }

  static fromObject(object: any): ExpedicaoPrioridadeDto {
    return new ExpedicaoPrioridadeDto({
      CodPrioridade: object.CodPrioridade,
      Descricao: object.Descricao,
      Prioridade: object.Prioridade,
      Ativo: object.Ativo,
    });
  }
}
