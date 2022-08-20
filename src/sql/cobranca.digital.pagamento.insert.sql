INSERT INTO integracao.CobrancaDigitalPagamento (
	SysId,
	Item,
	Sequencia,
	Status,
	DataPagamento,
	Valor
) VALUES (
	@SysId,
	@Item,
	@Sequencia,
	@Status,
	@DataPagamento,
	@Valor
)
