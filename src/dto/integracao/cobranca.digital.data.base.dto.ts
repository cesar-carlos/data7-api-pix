export default class CobrancaDigitalDataBaseDto {
  constructor(
    readonly codCobrancaDigitalDataBase: number,
    readonly provedor: string,
    readonly usuario: string,
    readonly senha: string,
    readonly servidor: string,
    readonly base: string,
    readonly porta: number,
  ) {}

  //create method from json
  static fromJson(json: any): CobrancaDigitalDataBaseDto {
    return new CobrancaDigitalDataBaseDto(
      json.codCobrancaDigitalDataBase || json.CodCobrancaDigitalDataBase,
      json.provedor || json.Provedor,
      json.usuario || json.Usuario,
      json.senha || json.Senha,
      json.servidor || json.Servidor,
      json.base || json.Base,
      json.porta || json.Porta,
    );
  }

  //create method to json
  toJson(): any {
    return {
      codCobrancaDigitalDataBase: this.codCobrancaDigitalDataBase,
      provedor: this.provedor,
      usuario: this.usuario,
      senha: this.senha,
      servidor: this.servidor,
      base: this.base,
      porta: this.porta,
    };
  }

  //create method from object
  static fromObject(object: any): CobrancaDigitalDataBaseDto {
    return new CobrancaDigitalDataBaseDto(
      object.codCobrancaDigitalDataBase || object.CodCobrancaDigitalDataBase,
      object.provedor || object.Provedor,
      object.usuario || object.Usuario,
      object.senha || object.Senha,
      object.servidor || object.Servidor,
      object.base || object.Base,
      object.porta || object.Porta,
    );
  }
}
