UPDATE Expedicao.ItemSeparacaoEstoque
SET SessionId = @SessionId,
  CodCarrinho = @CodCarrinho,
  CodSeparador = @CodSeparador,
  NomeSeparador = @NomeSeparador,
  DataSeparacao = @DataSeparacao,
  HoraSeparacao = @HoraSeparacao,
  CodProduto = @CodProduto,
  CodUnidadeMedida = @CodUnidadeMedida,
  Quantidade = @Quantidade
WHERE CodEmpresa = @CodEmpresa
  AND CodSepararEstoque = @CodSepararEstoque
  AND Item = @Item