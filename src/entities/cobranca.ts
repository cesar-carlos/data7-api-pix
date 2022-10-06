import Filial from './filial';
import Usuario from './usuario';
import Cliente from './cliente';
import Parcela from './cobranca.parcela';

import { requestCobrancaDto } from '../dto/request.cobranca.dto';

export default class Cobranca {
  constructor(
    readonly id: string,
    readonly chave: string,
    readonly usuario: Usuario,
    readonly filial: Filial,
    readonly cliente: Cliente,
    readonly parcelas: Parcela[],
  ) {}

  static fromRequestCobrancaDto(chave: string, cobranca: requestCobrancaDto): Cobranca {
    const usuario: Usuario = Usuario.fromObject(cobranca.Usuario);
    const filial: Filial = Filial.fromObject(cobranca.Filial);
    const cliente: Cliente = Cliente.fromObject(cobranca.Cliente);
    const parcelas: Parcela[] = cobranca.Parcelas.map((parcela: any) => {
      return Parcela.fromObject(parcela);
    });

    return new Cobranca(cobranca.CobSysId, chave, usuario, filial, cliente, parcelas);
  }
}
