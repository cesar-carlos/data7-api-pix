export default class UsuarioConsultaDto {
  readonly CodEmpresa: number;
  readonly CodUsuario: number;
  readonly NomeUsuario: string;
  readonly Ativo: string;
  readonly CodContaFinanceira?: string;
  readonly NomeContaFinanceira?: string;
  readonly NomeCaixaOperador?: string;
  readonly CodLocalArmazenagem?: number;
  readonly NomeLocalArmazenagem?: string;
  readonly CodVendedor?: number;
  readonly NomeVendedor?: string;
  readonly CodSetorEstoque?: number;
  readonly DescricaoSetorEstoque?: string;
  readonly PermiteSepararForaSequencia: string;
  readonly VisualizaTodasSeparacoes: string;
  readonly CodSetorConferencia?: number;
  readonly DescricaoSetorConferencia?: string;
  readonly PermiteConferirForaSequencia: string;
  readonly VisualizaTodasConferencias: string;
  readonly SalvaCarrinhoOutroUsuario: string;
  readonly EditaCarrinhoOutroUsuario: string;
  readonly ExcluiCarrinhoOutroUsuario: string;

  constructor(params: {
    CodEmpresa: number;
    CodUsuario: number;
    NomeUsuario: string;
    Ativo: string;
    CodContaFinanceira?: string;
    NomeContaFinanceira?: string;
    NomeCaixaOperador?: string;
    CodLocalArmazenagem?: number;
    NomeLocalArmazenagem?: string;
    CodVendedor?: number;
    NomeVendedor?: string;
    CodSetorEstoque?: number;
    DescricaoSetorEstoque?: string;
    PermiteSepararForaSequencia: string;
    VisualizaTodasSeparacoes: string;
    CodSetorConferencia?: number;
    DescricaoSetorConferencia?: string;
    PermiteConferirForaSequencia: string;
    VisualizaTodasConferencias: string;
    SalvaCarrinhoOutroUsuario: string;
    EditaCarrinhoOutroUsuario: string;
    ExcluiCarrinhoOutroUsuario: string;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodUsuario = params.CodUsuario;
    this.NomeUsuario = params.NomeUsuario;
    this.Ativo = params.Ativo;
    this.CodContaFinanceira = params.CodContaFinanceira;
    this.NomeContaFinanceira = params.NomeContaFinanceira;
    this.NomeCaixaOperador = params.NomeCaixaOperador;
    this.CodLocalArmazenagem = params.CodLocalArmazenagem;
    this.NomeLocalArmazenagem = params.NomeLocalArmazenagem;
    this.CodVendedor = params.CodVendedor;
    this.NomeVendedor = params.NomeVendedor;
    this.CodSetorEstoque = params.CodSetorEstoque;
    this.DescricaoSetorEstoque = params.DescricaoSetorEstoque;
    this.PermiteSepararForaSequencia = params.PermiteSepararForaSequencia;
    this.VisualizaTodasSeparacoes = params.VisualizaTodasSeparacoes;
    this.CodSetorConferencia = params.CodSetorConferencia;
    this.DescricaoSetorConferencia = params.DescricaoSetorConferencia;
    this.PermiteConferirForaSequencia = params.PermiteConferirForaSequencia;
    this.VisualizaTodasConferencias = params.VisualizaTodasConferencias;
    this.SalvaCarrinhoOutroUsuario = params.SalvaCarrinhoOutroUsuario;
    this.EditaCarrinhoOutroUsuario = params.EditaCarrinhoOutroUsuario;
    this.ExcluiCarrinhoOutroUsuario = params.ExcluiCarrinhoOutroUsuario;
  }

  static fromObject(object: any) {
    return new UsuarioConsultaDto({
      CodEmpresa: object.CodEmpresa || object.codEmpresa,
      CodUsuario: object.CodUsuario || object.codUsuario,
      NomeUsuario: object.NomeUsuario || object.nomeUsuario,
      Ativo: object.Ativo || object.ativo,
      CodContaFinanceira: object.CodContaFinanceira || object.codContaFinanceira,
      NomeContaFinanceira: object.NomeContaFinanceira || object.nomeContaFinanceira,
      NomeCaixaOperador: object.NomeCaixaOperador || object.nomeCaixaOperador,
      CodLocalArmazenagem: object.CodLocalArmazenagem || object.codLocalArmazenagem,
      NomeLocalArmazenagem: object.NomeLocalArmazenagem || object.nomeLocalArmazenagem,
      CodVendedor: object.CodVendedor || object.codVendedor,
      NomeVendedor: object.NomeVendedor || object.nomeVendedor,
      CodSetorEstoque: object.CodSetorEstoque || object.codSetorEstoque,
      DescricaoSetorEstoque: object.DescricaoSetorEstoque || object.descricaoSetorEstoque,
      PermiteSepararForaSequencia: object.PermiteSepararForaSequencia || object.permiteSepararForaSequencia,
      VisualizaTodasSeparacoes: object.VisualizaTodasSeparacoes || object.visualizaTodasSeparacoes,
      CodSetorConferencia: object.CodSetorConferencia || object.codSetorConferencia,
      DescricaoSetorConferencia: object.DescricaoSetorConferencia || object.descricaoSetorConferencia,
      PermiteConferirForaSequencia: object.PermiteConferirForaSequencia || object.permiteConferirForaSequencia,
      VisualizaTodasConferencias: object.VisualizaTodasConferencias || object.visualizaTodasConferencias,
      SalvaCarrinhoOutroUsuario: object.SalvaCarrinhoOutroUsuario || object.salvaCarrinhoOutroUsuario,
      EditaCarrinhoOutroUsuario: object.EditaCarrinhoOutroUsuario || object.editaCarrinhoOutroUsuario,
      ExcluiCarrinhoOutroUsuario: object.ExcluiCarrinhoOutroUsuario || object.excluiCarrinhoOutroUsuario,
    });
  }

  public toJson(): any {
    return {
      CodEmpresa: this.CodEmpresa,
      CodUsuario: this.CodUsuario,
      NomeUsuario: this.NomeUsuario,
      Ativo: this.Ativo,
      CodContaFinanceira: this.CodContaFinanceira || null,
      NomeContaFinanceira: this.NomeContaFinanceira || null,
      NomeCaixaOperador: this.NomeCaixaOperador || null,
      CodLocalArmazenagem: this.CodLocalArmazenagem || null,
      NomeLocalArmazenagem: this.NomeLocalArmazenagem || null,
      CodVendedor: this.CodVendedor || null,
      NomeVendedor: this.NomeVendedor || null,
      CodSetorEstoque: this.CodSetorEstoque || null,
      DescricaoSetorEstoque: this.DescricaoSetorEstoque || null,
      PermiteSepararForaSequencia: this.PermiteSepararForaSequencia,
      VisualizaTodasSeparacoes: this.VisualizaTodasSeparacoes,
      CodSetorConferencia: this.CodSetorConferencia || null,
      DescricaoSetorConferencia: this.DescricaoSetorConferencia || null,
      PermiteConferirForaSequencia: this.PermiteConferirForaSequencia,
      VisualizaTodasConferencias: this.VisualizaTodasConferencias,
      SalvaCarrinhoOutroUsuario: this.SalvaCarrinhoOutroUsuario,
      EditaCarrinhoOutroUsuario: this.EditaCarrinhoOutroUsuario,
      ExcluiCarrinhoOutroUsuario: this.ExcluiCarrinhoOutroUsuario,
    };
  }
}
