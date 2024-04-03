UPDATE Expedicao.ItemArmazenagem SET
	CodCarrinhoPercurso = @CodCarrinhoPercurso,
	ItemCarrinhoPercurso = @ItemCarrinhoPercurso,
	CodLocalArmazenagem = @CodLocalArmazenagem,
	CodSetorEstoque = @CodSetorEstoque,
	CodProduto = @CodProduto,
	NomeProduto = @NomeProduto,
	CodUnidadeMedida = @CodUnidadeMedida,
	CodigoBarras = @CodigoBarras,
	CodProdutoEndereco = @CodProdutoEndereco,
	Quantidade = @Quantidade,
  QuantidadeReservada = @QuantidadeReservada
WHERE CodEmpresa = @CodEmpresa
  AND CodArmazenagem = @CodArmazenagem
  AND Item = @Item
