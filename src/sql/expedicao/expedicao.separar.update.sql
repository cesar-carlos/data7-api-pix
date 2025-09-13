UPDATE Expedicao.SepararEstoque
SET
  Origem = @Origem,
  CodOrigem = @CodOrigem,
  CodTipoOperacaoExpedicao = @CodTipoOperacaoExpedicao,
  TipoEntidade = @TipoEntidade,
  CodEntidade = @CodEntidade,
  NomeEntidade = @NomeEntidade,
  Situacao = @Situacao,
  Data = @Data,
  Hora = @Hora,
  CodPrioridade = @CodPrioridade,
  Historico = @Historico,
  Observacao = @Observacao,
  CodMotivoCancelamento = @CodMotivoCancelamento,
  DataCancelamento = @DataCancelamento,
  HoraCancelamento = @HoraCancelamento,
  CodUsuarioCancelamento = @CodUsuarioCancelamento,
  NomeUsuarioCancelamento = @NomeUsuarioCancelamento,
  ObservacaoCancelamento = @ObservacaoCancelamento
WHERE CodEmpresa = @CodEmpresa
  AND CodSepararEstoque = @CodSepararEstoque
