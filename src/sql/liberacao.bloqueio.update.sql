UPDATE LiberacaoBloqueio SET
	Origem = @Origem,
	CodOrigem = @CodOrigem,
	DataHoraBloqueio = @DataHoraBloqueio,
	CodUsuarioBloqueio = @CodUsuarioBloqueio,
	NomeUsuarioBloqueio = @NomeUsuarioBloqueio,
	EstacaoTrabalhoBloqueio = @EstacaoTrabalhoBloqueio
WHERE CodEmpresa = @CodEmpresa
	AND CodFilial = @CodFilial
	AND CodLiberacaoBloqueio = @CodLiberacaoBloqueio

