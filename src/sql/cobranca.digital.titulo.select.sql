
SELECT
	CodEmpresa,
	CodCobrancaDigital,
	Item,
	SysId,
	Status,
	TipoCobranca,
	NumeroTitulo,
	Parcela,
  QtdParcelas,
	LiberacaoKey,
  DataLancamento,
	DataEmissao,
	DataVenda,
	DataVencimento,
	Valor,
	Observacao
FROM integracao.CobrancaDigitalTitulo
