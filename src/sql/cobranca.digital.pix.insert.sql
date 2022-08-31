INSERT INTO integracao.CobrancaDigitalPix (
	SysId,
	Sequencia,
	EndToEndId,
	DataCriacao,
	DataExpiracao,
	QrCode,
	ImagemQrcode
) VALUES (
	@SysId,
	@Sequencia,
	@EndToEndId,
	@DataCriacao,
	@DataExpiracao,
	@QrCode,
	@ImagemQrcode
)
