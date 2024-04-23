INSERT INTO Expedicao.Armazenar(
	CodEmpresa,
	CodArmazenar,
	NumeroDocumento,
	Origem,
	CodOrigem,
  CodPrioridade,
	DataLancamento,
	HoraLancamento,
	CodUsuarioLancamento,
	NomeUsuarioLancamento,
	EstacaoLancamento,
	Observacao
  )
VALUES (
	@CodEmpresa,
	@CodArmazenar,
	@NumeroDocumento,
	@Origem,
	@CodOrigem,
  @CodPrioridade,
	@DataLancamento,
	@HoraLancamento,
	@CodUsuarioLancamento,
	@NomeUsuarioLancamento,
	@EstacaoLancamento,
	@Observacao
  )
