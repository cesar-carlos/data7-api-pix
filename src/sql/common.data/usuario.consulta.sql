SELECT *
FROM (
    SELECT COALESCE(co.CodEmpresa, 1) CodEmpresa,
      usa.CodUsuario,
      usa.NomeLegivel NomeUsuario,
      COALESCE(usa.Ativo, 'S') Ativo,
      co.CodContaFinanceira,
      cf.Nome NomeContaFinanceira,
      co.Nome NomeCaixaOperador,
      co.CodLocalArmazenagem,
      la.Nome NomeLocalArmazenagem,
      co.CodVendedor,
      COALESCE(v.NomeReduzido, v.Nome) NomeVendedor,
      co.CodSetorEstoque,
      ese.Descricao DescricaoSetorEstoque,
	  lapp.CodLoginApp,
      COALESCE(co.PermiteSepararForaSequencia, 'N') PermiteSepararForaSequencia,
      COALESCE(co.VisualizaTodasSeparacoes, 'N') VisualizaTodasSeparacoes,
      co.CodSetorConferencia,
      esc.Descricao DescricaoSetorConferencia,
      COALESCE(co.PermiteConferirForaSequencia, 'N') PermiteConferirForaSequencia,
      COALESCE(co.VisualizaTodasConferencias, 'N') VisualizaTodasConferencias,
      COALESCE(co.SalvaCarrinhoOutroUsuario, 'N') SalvaCarrinhoOutroUsuario,
      COALESCE(co.EditaCarrinhoOutroUsuario, 'N') EditaCarrinhoOutroUsuario,
      COALESCE(co.ExcluiCarrinhoOutroUsuario, 'N') ExcluiCarrinhoOutroUsuario
    FROM Usuario usa
      LEFT JOIN CaixaOperador co ON co.CodUsuario = usa.CodUsuario
      LEFT JOIN Vendedor v ON v.CodVendedor = co.CodVendedor
      LEFT JOIN LocalArmazenagem la ON la.CodLocalArmazenagem = co.CodLocalArmazenagem
      LEFT JOIN Expedicao.SetorEstoque ese ON ese.CodSetorEstoque = co.CodSetorEstoque
      LEFT JOIN Expedicao.SetorConferencia esc ON esc.CodSetorConferencia = co.CodSetorConferencia
      LEFT JOIN ContaFinanceira cf ON cf.CodContaFinanceira = co.CodContaFinanceira
	  LEFT JOIN Expedicao.LoginApp lapp ON
		lapp.CodUsuario = usa.CodUsuario
	WHERE usa.Grupo = 'N'
  ) UsuarioConsulta



