INSERT INTO LiberacaoBloqueio (
	CodEmpresa,
	CodFilial,
	CodLiberacaoBloqueio,
	Origem,
	CodOrigem,
	DataHoraBloqueio,
	CodUsuarioBloqueio,
	NomeUsuarioBloqueio,
	EstacaoTrabalhoBloqueio
) VALUES (
	@CodEmpresa,
	@CodFilial,
	@CodLiberacaoBloqueio,
	@Origem,
	@CodOrigem,
	@DataHoraBloqueio,
	@CodUsuarioBloqueio,
	@NomeUsuarioBloqueio,
	@EstacaoTrabalhoBloqueio
)
