UPDATE Expedicao.TipoOperacaoExpedicao
SET Descricao = @Descricao,
  Ativo = @Ativo,
  Tipo = @Tipo,
  CodRelatorio = @CodRelatorio,
  CodLocalArmazenagem = @CodLocalArmazenagem,
  MovimentaEstoque = @MovimentaEstoque,
  CodTipoMovimentoEstoque = @CodTipoMovimentoEstoque,
  ControlaLote = @ControlaLote,
  ControlaNumeroSerie = @ControlaNumeroSerie
WHERE CodEmpresa = @CodEmpresa
  AND CodTipoOperacaoExpedicao = @CodTipoOperacaoExpedicao