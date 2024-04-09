INSERT INTO Expedicao.ItemArmazenar(
	CodEmpresa,
	CodArmazenar,
	Item,
  CodcarrinhoPercurso,
  ItemcarrinhoPercurso,
	CodProduto,
	NomeProduto,
	CodUnidadeMedida,
  CodProdutoEndereco,
	CodigoBarras,
	Quantidade
  )
VALUES (
	@CodEmpresa,
	@CodArmazenar,
    CASE
      WHEN @Item = '00000'
      OR @Item = '' THEN (
        SELECT FORMAT(ISNULL(MAX(CAST(Item AS INT)), 0) + 1, '00000')
        FROM Expedicao.ItemArmazenar
        WHERE CodEmpresa = @CodEmpresa
          AND CodArmazenar = @CodArmazenar
      )
      ELSE @Item
    END,
  @CodcarrinhoPercurso,
  @ItemcarrinhoPercurso,
	@CodProduto,
	@NomeProduto,
	@CodUnidadeMedida,
  @CodProdutoEndereco,
	@CodigoBarras,
	@Quantidade
  )
