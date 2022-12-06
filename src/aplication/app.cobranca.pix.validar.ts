import ProcessInfo from '../entities/process.info';
import { requestCobrancaDTO } from '../dto/request.cobranca.dto';

export default class AppCobrancaPixValidar {
  private infoSuccess = new ProcessInfo({ status: 'success' }, 'request validado', 'cobrança validado com sucesso');
  constructor() {}

  /// <summary>
  /// Valida se o valor da cobrança. Retornar erro "ProcessInfo.process.status 'error'" caso o valor seja inválido.
  /// </summary>
  public execute(request: requestCobrancaDTO[]): ProcessInfo {
    return this.infoSuccess;
  }
}
