SELECT *
FROM (
	SELECT
		ia.CodEmpresa,
		ia.CodArmazenar,
		ia.Item,
		ia.CodSetorEstoque,
		se.Descricao NomeSetorEstoque,
		ia.CodProduto,
		ia.NomeProduto,
		ia.CodUnidadeMedida,
		und.Descricao NomeUnidadeMedida,
		ia.CodigoBarras,
		ia.CodProdutoEndereco,
		pe.Descricao NomeProdutoEndereco,
		ia.Quantidade,
        ia.QuantidadeArmazenada
	FROM Expedicao.ItemArmazenar ia
	LEFT JOIN UnidadeMedida und ON
		und.CodUnidadeMedida = ia.CodUnidadeMedida
	LEFT JOIN LocalArmazenagem la ON
		la.CodLocalArmazenagem = ia.CodLocalArmazenar
	LEFT JOIN Expedicao.SetorEstoque se ON
		se.CodSetorEstoque = ia.CodSetorEstoque
	LEFT JOIN ProdutoEndereco pe ON
		pe.CodProdutoEndereco = ia.CodProdutoEndereco
 ) ItemArmazenarConsulta
