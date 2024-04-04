INSERT INTO Expedicao.ItemArmazenar(
	CodEmpresa,
	CodArmazenar,
	Item,
	CodProduto,
	NomeProduto,
	CodUnidadeMedida,
  CodSetorEstoque,
	CodigoBarras,
	CodProdutoEndereco,
	Quantidade,
  QuantidadeReservada
  )
VALUES (
	@CodEmpresa,
	@CodArmazenar,
    CASE
      WHEN @Item = '00000'
      OR @Item = '' THEN (
        SELECT FORMAT(ISNULL(MAX(CAST(Item AS INT)), 0) + 1, '00000')
        FROM Expedicao.ItemSolicitacaoArmazenar
        WHERE CodEmpresa = @CodEmpresa
          AND CodArmazenar = @CodArmazenar
      )
      ELSE @Item
    END,
	@CodProduto,
	@NomeProduto,
	@CodUnidadeMedida,
  @CodSetorEstoque,
	@CodigoBarras,
	@EnderecoArmazenar,
	@Quantidade,
  @QuantidadeReservada
  )
