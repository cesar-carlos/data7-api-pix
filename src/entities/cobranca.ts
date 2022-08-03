import Filial from './filial';
import Usuario from './usuario';
import Cliente from './cliente';
import Parcela from './cobranca.parcela';

import { requestCobrancaSe7eDto } from '../dto/request.cobranca.se7e.dto';
import Chave from './chave';

export default class Cobranca {
  constructor(
    readonly id: string,
    readonly chave: string,
    readonly usuario: Usuario,
    readonly filial: Filial,
    readonly cliente: Cliente,
    readonly parcelas: Parcela[],
  ) {}

  //create method from requestCobrancaSe7eDto
  static fromRequestCobrancaSe7eDto(chave: string, cobranca: requestCobrancaSe7eDto): Cobranca {
    const _usuario: Usuario = Usuario.fromObject(cobranca.Usuario);
    const _filial: Filial = Filial.fromObject(cobranca.Filial);
    const _cliente: Cliente = Cliente.fromObject(cobranca.Cliente);
    const _parcelas: Parcela[] = cobranca.Parcelas.map((parcela: any) => {
      return Parcela.fromObject(parcela);
    });

    return new Cobranca(cobranca.Id, chave, _usuario, _filial, _cliente, _parcelas);
  }
}
