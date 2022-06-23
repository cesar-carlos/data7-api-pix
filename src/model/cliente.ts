export default class Cliente {
  constructor(
    readonly codCliente: number,
    readonly nomeCliente: string,
    readonly cnpjCpf: string,
    readonly telefone: string,
    readonly eMail: string,
    readonly endereco: string,
    readonly numero: string,
    readonly complemento: string,
    readonly bairro: string,
    readonly cep: string,
    readonly codigoIBGE: string,
    readonly omeMunicipio: string,
    readonly uf: string
  ) {}

  //create method from json
  static fromJson(json: any): Cliente {
    return new Cliente(
      json.CodCliente,
      json.NomeCliente,
      json.CNPJCPF,
      json.Telefone,
      json.EMail,
      json.Endereco,
      json.Numero,
      json.Complemento,
      json.Bairro,
      json.CEP,
      json.CodigoIBGE,
      json.OmeMunicipio,
      json.UF
    );
  }
}
