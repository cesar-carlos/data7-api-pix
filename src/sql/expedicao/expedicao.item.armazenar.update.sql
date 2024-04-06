UPDATE Expedicao.ItemArmazenar SET
	CodProduto = @CodProduto,
	NomeProduto = @NomeProduto,
	CodUnidadeMedida = @CodUnidadeMedida,
  CodProdutoEndereco = @CodProdutoEndereco,
	CodigoBarras = @CodigoBarras,
	Quantidade = @Quantidade
WHERE CodEmpresa = @CodEmpresa
  AND CodArmazenar = @CodArmazenar
  AND Item = @Item
