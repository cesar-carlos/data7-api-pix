UPDATE ProcessoExecutavel
SET CodEmpresa = @CodEmpresa,
  CodFilial = @CodFilial,
  Status = @Status,
  Contexto = @Contexto,
  Origem = @Origem,
  CodOrigem = @CodOrigem,
  ItemOrigem = @ItemOrigem,
  DataAbertura = @DataAbertura,
  CodUsuario = @CodUsuario,
  NomeUsuario = @NomeUsuario,
  CodContaFinanceira = @CodContaFinanceira,
  CodPeriodoCaixa = @CodPeriodoCaixa,
  StatusPeriodoCaixa = @StatusPeriodoCaixa,
  UsuarioWindows = @UsuarioWindows,
  NomeComputador = @NomeComputador,
  BancoDados = @BancoDados
WHERE CodProcessoExecutavel = @CodProcessoExecutavel