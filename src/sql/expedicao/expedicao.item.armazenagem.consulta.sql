SELECT *
FROM (
	SELECT
		ia.CodEmpresa,
		ia.CodArmazenagem,
		ia.Item,
		ia.CodCarrinhoPercurso,
		ia.ItemCarrinhoPercurso,
		ia.CodLocalArmazenagem,
		la.Nome NomeLocalArmazenagem,
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
    ia.QuantidadeReservada
	FROM Expedicao.ItemArmazenagem ia
	LEFT JOIN UnidadeMedida und ON
		und.CodUnidadeMedida = ia.CodUnidadeMedida
	LEFT JOIN LocalArmazenagem la ON
		la.CodLocalArmazenagem = ia.CodLocalArmazenagem
	LEFT JOIN Expedicao.SetorEstoque se ON
		se.CodSetorEstoque = ia.CodSetorEstoque
	LEFT JOIN ProdutoEndereco pe ON
		pe.CodProdutoEndereco = ia.CodProdutoEndereco
 ) ItemArmazenagemConsulta
