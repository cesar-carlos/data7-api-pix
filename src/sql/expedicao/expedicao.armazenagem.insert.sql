INSERT INTO Expedicao.Armazenagem(
	CodEmpresa,
	CodArmazenagem,
	NumeroDocumento,
	Situacao,
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
	@CodArmazenagem,
	@NumeroDocumento,
	@Situacao,
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
