UPDATE Expedicao.SepararEstoque
SET CodTipoOperacaoExpedicao = @CodTipoOperacaoExpedicao,
  TipoEntidade = @TipoEntidade,
  CodEntidade = @CodEntidade,
  NomeEntidade = @NomeEntidade,
  Situacao = @Situacao,
  Data = @Data,
  Hora = @Hora,
  CodPrioridade = @CodPrioridade,
  Historico = @Historico,
  Observacao = @Observacao
WHERE CodEmpresa = @CodEmpresa
  AND CodSepararEstoque = @CodSepararEstoque