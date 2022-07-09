
INSERT INTO ItemLiberacaoBloqueio (
	CodLiberacaoBloqueio,
	Item,
	Status,
	CodRegra,
	Regra,
	MensagemBloqueio,
	DescricaoBloqueio,
	ObservacaoBloqueio,
	DataHoraSolicitacao,
	CodUsuarioSolicitacao,
	NomeUsuarioSolicitacao,
	EstacaoTrabalhoSolicitacao,
	ObservacaoLiberacaoBloqueio,
	MotivoRejeicaoLiberacaoBloqueio
) VALUES (
	@CodLiberacaoBloqueio,
	@Item,
	@Status,
	@CodRegra,
	@Regra,
	@MensagemBloqueio,
	@DescricaoBloqueio,
	@ObservacaoBloqueio,
	@DataHoraSolicitacao,
	@CodUsuarioSolicitacao,
	@NomeUsuarioSolicitacao,
	@EstacaoTrabalhoSolicitacao,
	@ObservacaoLiberacaoBloqueio,
	@MotivoRejeicaoLiberacaoBloqueio
)

