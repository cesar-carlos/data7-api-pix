INSERT INTO Expedicao.SepararEstoque(
    CodEmpresa,
    CodSepararEstoque,
    CodTipoOperacaoExpedicao,
    TipoEntidade,
    CodEntidade,
    NomeEntidade,
    Situacao,
    Data,
    Hora,
    CodPrioridade,
    Historico,
    Observacao
  )
VALUES (
    @CodEmpresa,
    @CodSepararEstoque,
    @CodTipoOperacaoExpedicao,
    @TipoEntidade,
    @CodEntidade,
    @NomeEntidade,
    @Situacao,
    @Data,
    @Hora,
    @CodPrioridade,
    @Historico,
    @Observacao
  )