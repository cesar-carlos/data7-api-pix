INSERT INTO integracao.CobrancaDigitalPix (
	SysId,
	Sequencia,
	TxId,
	LocId,
	DataCriacao,
	DataExpiracao,
	QrCode,
	ImagemQrcode,
	Valor
) VALUES (
	@SysId,
	@Sequencia,
	@TxId,
	@LocId,
	@DataCriacao,
	@DataExpiracao,
	@QrCode,
	@ImagemQrcode,
	@Valor
)
