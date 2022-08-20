INSERT INTO ItemLiberacaoBloqueioAPI (
	SysId,
	Situacao,
	DataLancamento,
	CodCliente,
	Origem,
	CodOrigem,
	Request,
	Respose,
	ObservacaoBloqueio,
	MotivoRejeicaoLiberacaoBloqueio
) VALUES (
	@SysId,
	@Situacao,
	@DataLancamento,
	@CodCliente,
	@Origem,
	@CodOrigem,
	@Request,
	@Respose,
	@ObservacaoBloqueio,
	@MotivoRejeicaoLiberacaoBloqueio
)
