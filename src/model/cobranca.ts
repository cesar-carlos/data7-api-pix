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
    readonly parcelas: Parcela[],
  ) {}

  //create method from json
  static fromJson(json: any): Cobranca {
    console.log(json);
    return new Cobranca(
      json.Id,
      Usuario.fromJson(json.Usuario),
      Filial.fromJson(json.Filial),
      Cliente.fromJson(json.Cliente),
      json.Parcelas.map((parcela: any) => Parcela.fromJson(parcela)),
    );
  }

  //create method to json
  toJson(): any {
    return {
      Id: this.id,
      Usuario: this.usuario.toJson(),
      Filial: this.filial.toJson(),
      Cliente: this.cliente.toJson(),
      Parcelas: this.parcelas.map((parcela: Parcela) => parcela.toJson()),
    };
  }
}
