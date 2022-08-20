UPDATE integracao.CobrancaDigitalLog SET
	Situacao = @Situacao,
	DataLancamento = @DataLancamento,
	CodCliente = @CodCliente,
	Origem = @Origem,
	CodOrigem = @CodOrigem,
	Request = @Request,
	Respose = @Respose,
	ObservacaoBloqueio = @ObservacaoBloqueio,
	MotivoRejeicaoLiberacaoBloqueio = @MotivoRejeicaoLiberacaoBloqueio
WHERE SysId = @SysId
