INSERT INTO integracao.CobrancaDigitalPagamento (
	SysId,
	Sequencia,
	Status,
	DataPagamento,
	Valor,
  Observacao
) VALUES (
	@SysId,
	@Sequencia,
	@Status,
	@DataPagamento,
	@Valor,
  @Observacao
)
