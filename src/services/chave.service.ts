import LocalBaseRepositoryContract from '../contracts/local.base.repository.contract';

import ChaveDto from '../dto/chave.dto';
import ChaveGnCobrancaService from './chave.gn.cobranca.service';
import CreateGnChaveService from './create.gn.chave.service';

export default class ChaveService {
  constructor(readonly localRepository: LocalBaseRepositoryContract<ChaveDto>) {}

  public async execute(): Promise<ChaveDto[]> {
    try {
      const chavesLocal = await this.localRepository.select();
      if (chavesLocal && chavesLocal.length > 0) {
        return chavesLocal;
      }

      const chaveGnCobrancaService = new ChaveGnCobrancaService();
      const chavesRemota = await chaveGnCobrancaService.execute();
      if (chavesRemota && chavesRemota.length > 0) {
        const chavesDto = chavesRemota.map((item: any) => {
          return new ChaveDto(
            item.codEmpresa,
            item.codFilial,
            item.codCobrancaDigital,
            item.uuid,
            item.status,
            item.dataCriacao,
            item.chave,
          );
        });

        chavesDto.forEach(async (item: ChaveDto) => {
          await this.localRepository.insert(item);
        });

        return chavesDto;
      }

      const createGnChaveService = new CreateGnChaveService();
      const chaveNova = await createGnChaveService.executar();
      const chaveNovaDto = new ChaveDto(
        chaveNova.codEmpresa,
        chaveNova.codFilial,
        chaveNova.codCobrancaDigital,
        chaveNova.uuid,
        chaveNova.status,
        chaveNova.dataCriacao,
        chaveNova.chave,
      );

      await this.localRepository.insert(chaveNovaDto);
      return [chaveNovaDto];
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
