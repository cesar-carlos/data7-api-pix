INSERT INTO integracao.CobrancaDigitalPagamento (
	SysId,
	Sequencia,
	Status,
	DataPagamento,
	Valor
) VALUES (
	@SysId,
	@Sequencia,
	@Status,
	@DataPagamento,
	@Valor
)
