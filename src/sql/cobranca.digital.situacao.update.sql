UPDATE integracao.CobrancaDigitalSituacao SET
	Status = @Status,
	TxId = @TxId,
	LocId = @LocId,
	Chave = @Chave
WHERE SysId = @SysId

