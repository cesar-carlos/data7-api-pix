export default class Cliente {
  readonly codEmpresa: number;
  readonly codFilial: number;
  readonly codCobrancaDigital: number;
  readonly codCliente: number;
  readonly nomeCliente: string;
  readonly cnpj_cpf: string;
  readonly telefone: string | null;
  readonly eMail: string | null;
  readonly endereco: string;
  readonly numero: string;
  readonly complemento: string | null;
  readonly bairro: string;
  readonly cep: string;
  readonly codigoIBGE: string;
  readonly nomeMunicipio: string;
  readonly uf: string;

  constructor(params: {
    codEmpresa: number;
    codFilial: number;
    codCobrancaDigital: number;
    codCliente: number;
    nomeCliente: string;
    cnpj_cpf: string;
    telefone: string | null;
    eMail: string | null;
    endereco: string;
    numero: string;
    complemento: string | null;
    bairro: string;
    cep: string;
    codigoIBGE: string;
    nomeMunicipio: string;
    uf: string;
  }) {
    this.codEmpresa = params.codEmpresa;
    this.codFilial = params.codFilial;
    this.codCobrancaDigital = params.codCobrancaDigital;
    this.codCliente = params.codCliente;
    this.nomeCliente = params.nomeCliente;
    this.cnpj_cpf = params.cnpj_cpf;
    this.telefone = params.telefone;
    this.eMail = params.eMail;
    this.endereco = params.endereco;
    this.numero = params.numero;
    this.complemento = params.complemento;
    this.bairro = params.bairro;
    this.cep = params.cep;
    this.codigoIBGE = params.codigoIBGE;
    this.nomeMunicipio = params.nomeMunicipio;
    this.uf = params.uf;
  }

  static create = (params: {
    codEmpresa: number;
    codFilial: number;
    codCobrancaDigital: number;
    codCliente: number;
    nomeCliente: string;
    cnpj_cpf: string;
    telefone: string | null;
    eMail: string | null;
    endereco: string;
    numero: string;
    complemento: string | null;
    bairro: string;
    cep: string;
    codigoIBGE: string;
    nomeMunicipio: string;
    uf: string;
  }) => {
    return new Cliente(params);
  };

  static fromObject = (object: any) => {
    return new Cliente({
      codEmpresa: object.CodEmpresa,
      codFilial: object.CodFilial,
      codCobrancaDigital: object.CodCobrancaDigital,
      codCliente: object.CodCliente,
      nomeCliente: object.NomeCliente,
      cnpj_cpf: object.CNPJ_CPF.replace(/[^0-9]/g, ''),
      telefone: object.Telefone,
      eMail: object.EMail,
      endereco: object.Endereco,
      numero: object.Numero,
      complemento: object.Complemento,
      bairro: object.Bairro,
      cep: object.CEP,
      codigoIBGE: object.CodigoIBGE,
      nomeMunicipio: object.NomeMunicipio,
      uf: object.UF,
    });
  };
}
