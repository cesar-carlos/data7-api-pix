export default class ExpedicaoMotivoRecusaDto {
  CodMotivoRecusa: number;
  Descricao: string;
  Ativo: string;

  constructor(params: { CodMotivoRecusa: number; Descricao: string; Ativo: string }) {
    this.CodMotivoRecusa = params.CodMotivoRecusa;
    this.Descricao = params.Descricao;
    this.Ativo = params.Ativo;
  }

  static fromObject(object: any): ExpedicaoMotivoRecusaDto {
    return new ExpedicaoMotivoRecusaDto({
      CodMotivoRecusa: object.CodMotivoRecusa,
      Descricao: object.Descricao,
      Ativo: object.Ativo,
    });
  }
}
