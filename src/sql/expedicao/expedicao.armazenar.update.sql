UPDATE Expedicao.Armazenar SET
	NumeroDocumento = @NumeroDocumento,
	Origem = @Origem,
	CodOrigem = @CodOrigem,
  CodPrioridade = @CodPrioridade,
	DataLancamento = @DataLancamento,
	HoraLancamento = @HoraLancamento,
	CodUsuarioLancamento  = @CodUsuarioLancamento,
	NomeUsuarioLancamento = @NomeUsuarioLancamento,
	EstacaoLancamento = @EstacaoLancamento,
	Observacao = @Observacao
WHERE CodEmpresa = @CodEmpresa
  AND CodArmazenar = @CodArmazenar
