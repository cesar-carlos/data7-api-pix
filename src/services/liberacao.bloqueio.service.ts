import LiberacaoBloqueio from '../entities/liberacao.bloqueio';

import LocalSqlServerLiberacaoBloqueioRepository from '../repository/local.sql.server.liberacao.bloqueio.repository';
import LocalSqlServerItemLiberacaoBloqueioRepository from '../repository/local.sql.server.item.liberacao.bloqueio.repository';
import LocalSqlServerItemLiberacaoBloqueioSituacaoRepository from '../repository/local.sql.server.item.liberacao.bloqueio.situacao.repository';

export default class LiberacaoBloqueioService {
  private sqlServerLiberacaoBloqueioRep = new LocalSqlServerLiberacaoBloqueioRepository();
  private sqlServerItemLiberacaoBloqueioRep = new LocalSqlServerItemLiberacaoBloqueioRepository();
  private sqlServerItemLiberacaoBloqueioSituacaoRepo = new LocalSqlServerItemLiberacaoBloqueioSituacaoRepository();

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

    const liberacoesDto = await this.sqlServerLiberacaoBloqueioRep.selectWhere(params);
    if (liberacoesDto === undefined) return undefined;

    return undefined;
  }
}
