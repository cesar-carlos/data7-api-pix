UPDATE integracao.CobrancaDigitalAdicionais SET
	Adicional = @Adicional
WHERE SysId = @SysId
 AND Sequencia = @Sequencia

