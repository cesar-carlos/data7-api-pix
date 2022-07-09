import LiberacaoBloqueio from '../entities/liberacao.bloqueio';
import LocalSqlServerLiberacaoBloqueioRepository from '../repository/local.sql.server.liberacao.bloqueio.repository';

export default class LiberacaoBloqueioService {
  constructor() {}

  public async getLiberacaoBloqueio(
    codEmpresa: number,
    codFilial: number,
    codLiberacaoBloqueio: number,
  ): Promise<LiberacaoBloqueio | undefined> {
    const params = [
      { key: 'CodEmpresa', value: codEmpresa },
      { key: 'CodFilial', value: codFilial },
      { key: 'CodLiberacaoBloqueio', value: codLiberacaoBloqueio },
    ];

    const _sqlServerLiberacaoBloqueioRepository = new LocalSqlServerLiberacaoBloqueioRepository();
    const liberacoesDto = await _sqlServerLiberacaoBloqueioRepository.selectWhere(params);
    if (liberacoesDto === undefined) return undefined;

    const liberacaoDto = liberacoesDto.shift();
    return undefined;
  }
}
