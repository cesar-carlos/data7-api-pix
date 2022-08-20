UPDATE integracao.CobrancaDigitalTitulo SET
	Origem = @Origem,
	CodOrigem = @CodOrigem,
	Status = @Status,
	TipoCobranca = @TipoCobranca,
	NumeroTitulo = @NumeroTitulo,
	NumeroParcela = @NumeroParcela,
	DataEmissao = @DataEmissao,
	DataVenda = @DataVenda,
	DataVencimento = @DataVencimento,
	Valor = @Valor
WHERE SysId = @SysId
  AND Item = @Item
