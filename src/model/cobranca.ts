import Cliente from './cliente';
import Filial from './filial';
import Parcela from './parcela';
import Usuario from './usuario';

export default class Cobranca {
  constructor(
    readonly id: string,
    readonly usuario: Usuario,
    readonly filial: Filial,
    readonly cliente: Cliente,
    readonly parcelas: Parcela[]
  ) {}

  //create method from json
  static fromJson(json: any): Cobranca {
    return new Cobranca(
      json.Id,
      Usuario.fromJson(json.Usuario),
      Filial.fromJson(json.Filial),
      Cliente.fromJson(json.Cliente),
      json.Parcelas.map((parcela: any) => Parcela.fromJson(parcela))
    );
  }
}
