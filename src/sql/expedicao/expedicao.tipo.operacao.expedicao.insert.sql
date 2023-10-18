INSERT INTO Expedicao.TipoOperacaoExpedicao(
    CodEmpresa,
    CodTipoOperacaoExpedicao,
    Descricao,
    Ativo,
    Tipo,
    CodRelatorio,
    CodLocalArmazenagem,
    MovimentaEstoque,
    CodTipoMovimentoEstoque,
    ControlaLote,
    ControlaNumeroSerie
  )
VALUES (
    @CodEmpresa,
    @CodTipoOperacaoExpedicao,
    @Descricao,
    @Ativo,
    @Tipo,
    @CodRelatorio,
    @CodLocalArmazenagem,
    @MovimentaEstoque,
    @CodTipoMovimentoEstoque,
    @ControlaLote,
    @ControlaNumeroSerie
  )