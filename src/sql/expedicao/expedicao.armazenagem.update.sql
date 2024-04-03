UPDATE Expedicao.Armazenagem SET
	NumeroDocumento = @NumeroDocumento,
	Situacao = @Situacao,
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
  AND CodArmazenagem = @CodArmazenagem
