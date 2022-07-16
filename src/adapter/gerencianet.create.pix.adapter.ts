import ContractCredentialPIX from '../contracts/credential.pix.contract';
import { requestCreatePixDto } from '../dto/request.create.pix.dto';
import { responseCreatePixDto } from '../dto/response.create.pix.dto';
import GerencianetBase from './gerencianet.base';

export default class GerencianetCreatePixAdapter extends GerencianetBase {
  constructor(config: ContractCredentialPIX) {
    super(config);
  }

  public async execute(request: requestCreatePixDto): Promise<responseCreatePixDto> {
    try {
      const params = request.params;
      const body = this.body(request);
      const response = await this.gerencianet.pixCreateImmediateCharge(params, body);
      const result: responseCreatePixDto = response;
      return result;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }

  private body(request: requestCreatePixDto) {
    const body = {
      calendario: { expiracao: request.calendario.expiracao },
      devedor: { cpf: request.devedor.cpf, nome: request.devedor.nome },
      valor: { original: request.valor.original },
      chave: request.chave,
      solicitacaoPagador: request.solicitacaoPagador,
      infoAdicionais: request.infoAdicionais,
    };

    return body;
  }
}