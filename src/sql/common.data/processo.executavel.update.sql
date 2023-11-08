UPDATE ProcessoExecutavel
SET CodEmpresa = @CodEmpresa,
  CodFilial = @CodFilial,
  Status = @Status,
  Origem = @Origem,
  CodOrigem = @CodOrigem,
  ItemOrigem = @ItemOrigem,
  DataAbertura = @DataAbertura,
  CodUsuario = @CodUsuario,
  NomeUsuario = @NomeUsuario,
  CodContaFinanceira = @CodContaFinanceira,
  CodPeriodoCaixa = @CodPeriodoCaixa,
  StatusPeriodoCaixa = @StatusPeriodoCaixa,
  NomeComputador = @NomeComputador,
  UsuarioWindows = @UsuarioWindows,
  BancoDados = @BancoDados
WHERE CodProcessoExecutavel = @CodProcessoExecutavel