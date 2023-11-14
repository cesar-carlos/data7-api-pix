export default class ExpedicaoTipoOperacaoExpedicaoDto {
  CodEmpresa: number;
  CodTipoOperacaoExpedicao: number;
  Descricao: string;
  Ativo: string;
  Tipo: string;
  CodRelatorio: number;
  CodLocalArmazenagem: number;
  MovimentaEstoque: string;
  CodTipoMovimentoEstoque: number;
  ControlaLote: string;
  ControlaNumeroSerie: string;

  constructor(params: {
    CodEmpresa: number;
    CodTipoOperacaoExpedicao: number;
    Descricao: string;
    Ativo: string;
    Tipo: string;
    CodRelatorio: number;
    CodLocalArmazenagem: number;
    MovimentaEstoque: string;
    CodTipoMovimentoEstoque: number;
    ControlaLote: string;
    ControlaNumeroSerie: string;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodTipoOperacaoExpedicao = params.CodTipoOperacaoExpedicao;
    this.Descricao = params.Descricao;
    this.Ativo = params.Ativo;
    this.Tipo = params.Tipo;
    this.CodRelatorio = params.CodRelatorio;
    this.CodLocalArmazenagem = params.CodLocalArmazenagem;
    this.MovimentaEstoque = params.MovimentaEstoque;
    this.CodTipoMovimentoEstoque = params.CodTipoMovimentoEstoque;
    this.ControlaLote = params.ControlaLote;
    this.ControlaNumeroSerie = params.ControlaNumeroSerie;
  }

  public copyWith(params: {
    CodEmpresa: number;
    CodTipoOperacaoExpedicao: number;
    Descricao: string;
    Ativo: string;
    Tipo: string;
    CodRelatorio: number;
    CodLocalArmazenagem: number;
    MovimentaEstoque: string;
    CodTipoMovimentoEstoque: number;
    ControlaLote: string;
    ControlaNumeroSerie: string;
  }): ExpedicaoTipoOperacaoExpedicaoDto {
    return new ExpedicaoTipoOperacaoExpedicaoDto({
      CodEmpresa: params.CodEmpresa ?? this.CodEmpresa,
      CodTipoOperacaoExpedicao: params.CodTipoOperacaoExpedicao ?? this.CodTipoOperacaoExpedicao,
      Descricao: params.Descricao ?? this.Descricao,
      Ativo: params.Ativo ?? this.Ativo,
      Tipo: params.Tipo ?? this.Tipo,
      CodRelatorio: params.CodRelatorio ?? this.CodRelatorio,
      CodLocalArmazenagem: params.CodLocalArmazenagem ?? this.CodLocalArmazenagem,
      MovimentaEstoque: params.MovimentaEstoque ?? this.MovimentaEstoque,
      CodTipoMovimentoEstoque: params.CodTipoMovimentoEstoque ?? this.CodTipoMovimentoEstoque,
      ControlaLote: params.ControlaLote ?? this.ControlaLote,
      ControlaNumeroSerie: params.ControlaNumeroSerie ?? this.ControlaNumeroSerie,
    });
  }

  static fromObject(object: any): ExpedicaoTipoOperacaoExpedicaoDto {
    return new ExpedicaoTipoOperacaoExpedicaoDto({
      CodEmpresa: object.CodEmpresa,
      CodTipoOperacaoExpedicao: object.CodTipoOperacaoExpedicao,
      Descricao: object.Descricao,
      Ativo: object.Ativo,
      Tipo: object.Tipo,
      CodRelatorio: object.CodRelatorio,
      CodLocalArmazenagem: object.CodLocalArmazenagem,
      MovimentaEstoque: object.MovimentaEstoque,
      CodTipoMovimentoEstoque: object.CodTipoMovimentoEstoque,
      ControlaLote: object.ControlaLote,
      ControlaNumeroSerie: object.ControlaNumeroSerie,
    });
  }

  toJson(): any {
    return {
      CodEmpresa: this.CodEmpresa,
      CodTipoOperacaoExpedicao: this.CodTipoOperacaoExpedicao,
      Descricao: this.Descricao,
      Ativo: this.Ativo,
      Tipo: this.Tipo,
      CodRelatorio: this.CodRelatorio,
      CodLocalArmazenagem: this.CodLocalArmazenagem,
      MovimentaEstoque: this.MovimentaEstoque,
      CodTipoMovimentoEstoque: this.CodTipoMovimentoEstoque,
      ControlaLote: this.ControlaLote,
      ControlaNumeroSerie: this.ControlaNumeroSerie,
    };
  }
}
