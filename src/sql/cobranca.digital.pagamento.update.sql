UPDATE integracao.CobrancaDigitalPagamento SET
	Status = @Status,
	DataPagamento = @DataPagamento,
	Valor = @Valor
WHERE SysId = @SysId
 AND Item = @Item
 AND Sequencia = @Sequencia
