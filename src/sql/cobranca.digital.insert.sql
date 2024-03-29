INSERT INTO integracao.CobrancaDigital (
	CodEmpresa,
	CodFilial,
	CodCobrancaDigital,
	Origem,
	CodOrigem,
	Situacao,
	CodCliente,
	NomeCliente,
	CNPJ_CPF,
	Telefone,
	Email,
	Endereco,
	Numero,
	Complemento,
	Bairro,
	CEP,
	CodigoMunicipio,
	NomeMunicipio,
	UFMunicipio,
	CodUsuario,
	NomeUsuario,
	EstacaoTrabalho,
	Ip
) VALUES (
	@CodEmpresa,
	@CodFilial,
	@CodCobrancaDigital,
	@Origem,
	@CodOrigem,
	@Situacao,
	@CodCliente,
	@NomeCliente,
	@CNPJ_CPF,
	@Telefone,
	@Email,
	@Endereco,
	@Numero,
	@Complemento,
	@Bairro,
	@CEP,
	@CodigoMunicipio,
	@NomeMunicipio,
	@UFMunicipio,
	@CodUsuario,
	@NomeUsuario,
	@EstacaoTrabalho,
	@Ip
)
