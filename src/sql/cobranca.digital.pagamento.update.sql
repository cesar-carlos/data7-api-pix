UPDATE integracao.CobrancaDigitalPagamento SET
	Status = @Status,
	DataPagamento = @DataPagamento,
	Valor = @Valor,
  Observacao = @Observacao
WHERE SysId = @SysId
 AND Sequencia = @Sequencia
