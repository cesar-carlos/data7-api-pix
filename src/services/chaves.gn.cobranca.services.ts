import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import GerencianetListTokenAdapter from '../adapter/gerencianet.list.token.adapter';
import LocalBaseRepositoryContract from '../contracts/local.base.repository.contract';
import ChaveDto from '../dto/chave.dto';
import { ResponseChaveDto } from '../dto/response.chave.dto';

export default class ChavesGnCobrancaServices {
  //todo: config Gn - remove
  private config = require(path.resolve(__dirname, '..', 'assets', 'config.pix.ts'));

  constructor(private repoChave: LocalBaseRepositoryContract<ChaveDto>) {}
  async execute(): Promise<ChaveDto | undefined> {
    try {
      const gerencianetListToken = new GerencianetListTokenAdapter(this.config);
      const chaves = await this.repoChave.select();
      if (!chaves || chaves.length === 0) {
        const response = await gerencianetListToken.execute();
        const newChaves = response.map((item: ResponseChaveDto) => {
          return new ChaveDto(uuidv4(), 'A', new Date(), item.chave);
        });

        newChaves.forEach(async (chave: ChaveDto) => {
          await this.repoChave.insert(chave);
        });

        newChaves.shift();
      }

      return chaves?.shift();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
