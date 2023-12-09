INSERT INTO Expedicao.ItemConferir(
    CodEmpresa,
    CodConferir,
    Item,
    CodCarrinhoPercurso,
    ItemCarrinhoPercurso,
    CodProduto,
    CodUnidadeMedida,
    Quantidade,
    QuantidadeConferida
  )
VALUES (
    @CodEmpresa,
    @CodConferir,
    @Item,
    @CodCarrinhoPercurso,
    @ItemCarrinhoPercurso,
    @CodProduto,
    @CodUnidadeMedida,
    @Quantidade,
    @QuantidadeConferida
  )