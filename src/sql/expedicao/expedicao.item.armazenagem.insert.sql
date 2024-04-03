INSERT INTO Expedicao.ItemArmazenagem(
	CodEmpresa,
	CodArmazenagem,
	Item,
	CodCarrinhoPercurso,
	ItemCarrinhoPercurso,
	CodLocalArmazenagem,
	CodSetorEstoque,
	CodProduto,
	NomeProduto,
	CodUnidadeMedida,
	CodigoBarras,
	CodProdutoEndereco,
	Quantidade,
  QuantidadeReservada
  )
VALUES (
	@CodEmpresa,
	@CodArmazenagem,
    CASE
      WHEN @Item = '00000'
      OR @Item = '' THEN (
        SELECT FORMAT(ISNULL(MAX(CAST(Item AS INT)), 0) + 1, '00000')
        FROM Expedicao.ItemSolicitacaoArmazenagem
        WHERE CodEmpresa = @CodEmpresa
          AND CodArmazenagem = @CodArmazenagem
      )
      ELSE @Item
    END,
  @CodCarrinhoPercurso,
  @ItemCarrinhoPercurso,
	@CodLocalArmazenagem,
  @CodSetorEstoque,
	@CodProduto,
	@NomeProduto,
	@CodUnidadeMedida,
	@CodigoBarras,
	@EnderecoArmazenagem,
	@Quantidade,
  @QuantidadeReservada
  )
