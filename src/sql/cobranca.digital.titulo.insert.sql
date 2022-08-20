INSERT INTO integracao.CobrancaDigitalTitulo (
	SysId,
	Item,
	Origem,
	CodOrigem,
	Status,
	TipoCobranca,
	NumeroTitulo,
	NumeroParcela,
	DataEmissao,
	DataVenda,
	DataVencimento,
	Valor
) VALUES (
	@SysId,
	@Item,
	@Origem,
	@CodOrigem,
	@Status,
	@TipoCobranca,
	@NumeroTitulo,
	@NumeroParcela,
	@DataEmissao,
	@DataVenda,
	@DataVencimento,
	@Valor
)
