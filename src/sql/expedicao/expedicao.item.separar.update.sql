UPDATE Expedicao.ItemSepararEstoque
SET CodSetorEstoque = @CodSetorEstoque,
  Origem = @Origem,
  CodOrigem = @CodOrigem,
  ItemOrigem = @ItemOrigem,
  CodLocaArmazenagem = @CodLocaArmazenagem,
  CodProduto = @CodProduto,
  CodUnidadeMedida = @CodUnidadeMedida,
  Quantidade = @Quantidade,
  QuantidadeInterna = @QuantidadeInterna,
  QuantidadeExterna = @QuantidadeExterna,
  QuantidadeSeparacao = @QuantidadeSeparacao
WHERE CodEmpresa = @CodEmpresa
  AND CodSepararEstoque = @CodSepararEstoque
  AND Item = @Item