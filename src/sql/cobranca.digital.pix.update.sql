UPDATE integracao.CobrancaDigitalPix SET
	TxId = @TxId,
	LocId = @LocId,
	DataCriacao = @DataCriacao,
	DataExpiracao = @DataExpiracao,
	QrCode = @QrCode,
	ImagemQrcode = @ImagemQrcode,
	Valor = @Valor
WHERE SysId = @SysId
  AND Sequencia = @Sequencia
