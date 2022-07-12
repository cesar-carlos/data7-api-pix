import ContractCredentialPIX from '../contracts/credential.pix.contract';
import { responseCreateChaveDto } from '../dto/response.create.chave.dto';
import GerencianetBase from './gerencianet.base';

export default class GerencianetCreateTokenAdapter extends GerencianetBase {
  constructor(config: ContractCredentialPIX) {
    super(config);
  }

  public async execute(): Promise<responseCreateChaveDto> {
    try {
      const response = await this.gerencianet.gnCreateEvp();
      const token: responseCreateChaveDto = {
        status: 'Ativo',
        dataCriacao: new Date(),
        chave: response.chave,
      };

      return token;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
