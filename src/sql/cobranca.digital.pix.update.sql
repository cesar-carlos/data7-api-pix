UPDATE integracao.CobrancaDigitalPix SET
	EndToEndId = @EndToEndId,
	DataCriacao = @DataCriacao,
	DataExpiracao = @DataExpiracao,
	QrCode = @QrCode,
	ImagemQrcode = @ImagemQrcode
WHERE SysId = @SysId
	AND Item = @Item
  AND Sequencia = @Sequencia
