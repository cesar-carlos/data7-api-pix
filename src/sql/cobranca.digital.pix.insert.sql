INSERT INTO integracao.CobrancaDigitalPix (
	SysId,
	Item,
	Sequencia,
	EndToEndId,
	DataCriacao,
	DataExpiracao,
	QrCode,
	ImagemQrcode
) VALUES (
	@SysId,
	@Item,
	@Sequencia,
	@EndToEndId,
	@DataCriacao,
	@DataExpiracao,
	@QrCode,
	@ImagemQrcode
)
