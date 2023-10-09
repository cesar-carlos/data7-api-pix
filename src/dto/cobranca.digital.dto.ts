export default class CobrancaDigitalDto {
  constructor(
    readonly codEmpresa: number,
    readonly codFilial: number,
    readonly codCobrancaDigital: number,
    readonly bloqueioKey: string,
    readonly origem: string,
    readonly codOrigem: number,
    public situacao: string,
    readonly codCliente: number,
    readonly nomeCliente: string,
    readonly CNPJ_CPF: string,
    readonly telefone: string,
    readonly email: string,
    readonly endereco: string,
    readonly numero: string,
    readonly complemento: string,
    readonly bairro: string,
    readonly CEP: string,
    readonly codigoMunicipio: string,
    readonly nomeMunicipio: string,
    readonly UFMunicipio: string,
    readonly codUsuario: number,
    readonly nomeUsuario: string,
    readonly estacaoTrabalho: string,
    readonly ip: string,
  ) {}

  public static fromObject(obj: any): CobrancaDigitalDto {
    return new CobrancaDigitalDto(
      obj.codEmpresa || obj.CodEmpresa,
      obj.codFilial || obj.CodFilial,
      obj.codCobrancaDigital || obj.CodCobrancaDigital,
      obj.bloqueioKey || obj.BloqueioKey,
      obj.origem || obj.Origem,
      obj.codOrigem || obj.CodOrigem,
      obj.situacao || obj.Situacao,
      obj.codCliente || obj.CodCliente,
      obj.nomeCliente || obj.NomeCliente,
      obj.CNPJ_CPF || obj.cnpj_cpf,
      obj.telefone || obj.Telefone,
      obj.email || obj.Email,
      obj.endereco || obj.Endereco,
      obj.numero || obj.Numero,
      obj.complemento || obj.Complemento,
      obj.bairro || obj.Bairro,
      obj.CEP || obj.cep,
      obj.codigoMunicipio || obj.CodigoMunicipio,
      obj.nomeMunicipio || obj.NomeMunicipio,
      obj.UFMunicipio || obj.UFMunicipio,
      obj.codUsuario || obj.CodUsuario,
      obj.nomeUsuario || obj.NomeUsuario,
      obj.estacaoTrabalho || obj.EstacaoTrabalho,
      obj.ip || obj.IP || obj.Ip,
    );
  }
}
