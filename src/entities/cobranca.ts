import Filial from './filial';
import Usuario from './usuario';
import Cliente from './cliente';
import Parcela from './cobranca.parcela';

import { requestCobrancaSe7eDto } from '../dto/request.cobranca.se7e.dto';
import Chave from './chave';

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
    return new Cobranca(
      json.id || json.Id,
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

  //create method from object
  static fromObject(obj: any): Cobranca {
    return new Cobranca(
      obj.id || obj.Id,
      Usuario.fromObject(obj.usuario),
      Filial.fromObject(obj.filial),
      Cliente.fromObject(obj.cliente),
      obj.parcelas.map((parcela: any) => Parcela.fromObject(parcela)),
    );
  }

  //create method from requestCobrancaSe7eDto
  static fromRequestCobrancaSe7eDto(cobrancaSe7eDto: requestCobrancaSe7eDto): Cobranca {
    const _usuario: Usuario = Usuario.fromObject(cobrancaSe7eDto.Usuario);
    const _filial: Filial = Filial.fromObject(cobrancaSe7eDto.Filial);
    const _cliente: Cliente = Cliente.fromObject(cobrancaSe7eDto.Cliente);
    const _parcelas: Parcela[] = cobrancaSe7eDto.Parcelas.map((parcela: any) => {
      return Parcela.fromObject(parcela);
    });

    return new Cobranca(cobrancaSe7eDto.Id, _usuario, _filial, _cliente, _parcelas);
  }
}
