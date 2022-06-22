import { Cliente } from "./cliente";
import { Filial } from "./filial";
import { Parcela } from "./parcela";
import { Usuario } from "./usuario";

export interface Cobranca {
  id: string;
  usuario: Usuario;
  filial: Filial;
  cliente: Cliente;
  parcelas: Parcela[];
}
