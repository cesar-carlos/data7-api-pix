
INSERT INTO ItemLiberacaoBloqueio (
	CodLiberacaoBloqueio,
	Item,
	Status,
	RotinaLiberacao,
	DataHoraLiberacao,
	CodUsuarioLiberacao,
	EstacaoTrabalhoLiberacao,
	ObservacaoLiberacao,
	MotivoRejeicaoLiberacaoBloqueio,
	Complemento
) VALUES (
	@CodLiberacaoBloqueio,
	@Item,
	@Status,
	@RotinaLiberacao,
	@DataHoraLiberacao,
	@CodUsuarioLiberacao,
	@EstacaoTrabalhoLiberacao,
	@ObservacaoLiberacao,
	@MotivoRejeicaoLiberacaoBloqueio,
	@Complemento
)
