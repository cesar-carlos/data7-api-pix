INSERT INTO Expedicao.ItemSeparacaoEstoque(
    CodEmpresa,
    CodSepararEstoque,
    Item,
    SessionId,
    CodCarrinho,
    CodSeparador,
    NomeSeparador,
    DataSeparacao,
    HoraSeparacao,
    CodProduto,
    CodUnidadeMedida,
    Quantidade
  )
VALUES (
    @CodEmpresa,
    @CodSepararEstoque,
    @Item,
    @SessionId,
    @CodCarrinho,
    @CodSeparador,
    @NomeSeparador,
    @DataSeparacao,
    @HoraSeparacao,
    @CodProduto,
    @CodUnidadeMedida,
    @Quantidade
  )