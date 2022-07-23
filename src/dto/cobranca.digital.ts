export default class CobrancaDigitalDto {
  constructor(
    readonly codEmpresa: number,
    readonly codFilial: number,
    readonly codCobrancaDigital: number,
    readonly codCliente: number,
    readonly nomeCliente: string,
    readonly cnpj_cpf: string,
    readonly telefone: string,
    readonly eMail: string,
    readonly endereco: string,
    readonly numero: string,
    readonly complemento: string,
    readonly bairro: string,
    readonly cep: number,
    readonly codigoIBGE: string,
    readonly codUsuario: number,
    readonly nomeUsuario: string,
    readonly estacaoTrabalho: string,
    readonly ip: string,
  ) {}
}
