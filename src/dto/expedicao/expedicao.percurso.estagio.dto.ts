export default class ExpedicaoPercursoEstagioDto {
  CodPercursoEstagio: number;
  Descricao: string;
  Ativo: string;
  Sigla: string;
  Sequencia: number;

  constructor(params: {
    CodPercursoEstagio: number;
    Descricao: string;
    Ativo: string;
    Sigla: string;
    Sequencia: number;
  }) {
    this.CodPercursoEstagio = params.CodPercursoEstagio;
    this.Descricao = params.Descricao;
    this.Ativo = params.Ativo;
    this.Sigla = params.Sigla;
    this.Sequencia = params.Sequencia;
  }

  public copyWith(params: {
    CodPercursoEstagio: number;
    Descricao: string;
    Ativo: string;
    Sigla: string;
    Sequencia: number;
  }): ExpedicaoPercursoEstagioDto {
    return new ExpedicaoPercursoEstagioDto({
      CodPercursoEstagio: params.CodPercursoEstagio ?? this.CodPercursoEstagio,
      Descricao: params.Descricao ?? this.Descricao,
      Ativo: params.Ativo ?? this.Ativo,
      Sigla: params.Sigla ?? this.Sigla,
      Sequencia: params.Sequencia ?? this.Sequencia,
    });
  }

  static fromObject(object: any): ExpedicaoPercursoEstagioDto {
    return new ExpedicaoPercursoEstagioDto({
      CodPercursoEstagio: object.CodPercursoEstagio,
      Descricao: object.Descricao,
      Ativo: object.Ativo,
      Sigla: object.Sigla,
      Sequencia: object.Sequencia,
    });
  }

  toJson(): any {
    return {
      CodPercursoEstagio: this.CodPercursoEstagio,
      Descricao: this.Descricao,
      Ativo: this.Ativo,
      Sigla: this.Sigla,
      Sequencia: this.Sequencia,
    };
  }
}
