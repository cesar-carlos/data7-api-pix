import Chave from '../entities/chave';
import ProcessInfo from '../entities/process.info';

export default interface TokenCobrancaContract {
  execute(): Promise<Chave | ProcessInfo>;
}
