UPDATE Expedicao.ItemArmazenar SET
	CodProduto = @CodProduto,
	NomeProduto = @NomeProduto,
	CodUnidadeMedida = @CodUnidadeMedida,
  CodSetorEstoque = @CodSetorEstoque,
	CodigoBarras = @CodigoBarras,
	CodProdutoEndereco = @CodProdutoEndereco,
	Quantidade = @Quantidade,
  QuantidadeReservada = @QuantidadeReservada
WHERE CodEmpresa = @CodEmpresa
  AND CodArmazenar = @CodArmazenar
  AND Item = @Item
