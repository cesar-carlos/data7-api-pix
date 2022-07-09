
UPDATE ItemLiberacaoBloqueio SET
	Status = @Status,
	RotinaLiberacao = @RotinaLiberacao,
	DataHoraLiberacao = @DataHoraLiberacao,
	CodUsuarioLiberacao = @CodUsuarioLiberacao,
	EstacaoTrabalhoLiberacao = @EstacaoTrabalhoLiberacao,
	ObservacaoLiberacao = @ObservacaoLiberacao,
	MotivoRejeicaoLiberacaoBloqueio = @MotivoRejeicaoLiberacaoBloqueio,
	Complement = @Complemento
WHERE CodLiberacaoBloqueio = @CodLiberacaoBloqueio
	AND Item = @Item

