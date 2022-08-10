import moment from 'moment';
import { STATUS } from '../type/status';

import ItemLiberacaoBloqueioSituacaoDto from '../dto/item.liberacao.bloqueio.situacao.dto';
import CobrancaPix from '../entities/cobranca.pix';
import ItemLiberacaoBloqueioSituacao from '../entities/item.liberacao.bloqueio.situacao';
import ProcessInfo from '../entities/process.info';
import FirebaseCobrancaPixRepository from '../repository/firebase.cobranca.pix.repository';
import LocalSqlServerItemLiberacaoBloqueioRepository from '../repository/local.sql.server.item.liberacao.bloqueio.repository';
import LocalSqlServerItemLiberacaoBloqueioSituacaoRepository from '../repository/local.sql.server.item.liberacao.bloqueio.situacao.repository';
import LocalSqlServerLiberacaoBloqueioRepository from '../repository/local.sql.server.liberacao.bloqueio.repository';
import RegraBloqueioService from './regra.bloqueio.service';

export default class CancelamentoPixService {
  private sqlServerLiberacaoBloqueioRepo = new LocalSqlServerLiberacaoBloqueioRepository();
  private sqlServerItemLiberacaoBloqueioRepo = new LocalSqlServerItemLiberacaoBloqueioRepository();
  private sqlServerItemLiberacaoBloqueioSituacaoRepo = new LocalSqlServerItemLiberacaoBloqueioSituacaoRepository();
  private fbCobrancaPixRepository = new FirebaseCobrancaPixRepository();

  constructor() {}
  public async execute(cobrancaPix: CobrancaPix): Promise<void> {
    try {
      const _regraBloqueioService = new RegraBloqueioService(
        this.sqlServerLiberacaoBloqueioRepo,
        this.sqlServerItemLiberacaoBloqueioRepo,
        this.sqlServerItemLiberacaoBloqueioSituacaoRepo,
      );

      const keyLiberacao = {
        CodEmpresa: cobrancaPix.LiberacaoKey.codEmpresa,
        CodFilial: cobrancaPix.LiberacaoKey.codFilial,
        IdLiberacao: cobrancaPix.LiberacaoKey.idLiberacao,
        Origem: cobrancaPix.LiberacaoKey.origem,
        CodOrigem: cobrancaPix.LiberacaoKey.codOrigem,
        Item: cobrancaPix.LiberacaoKey.item,
      };

      const bloqueioOrProcessInfo = await _regraBloqueioService.findOneFromLiberacaoKey(keyLiberacao);
      if (bloqueioOrProcessInfo instanceof ProcessInfo) {
        return;
      }

      //LIBERAR REGRA DE BLOQUIO
      const dataLiberacao = moment().utc().format('YYYY-MM-DD HH:mm:ss');
      bloqueioOrProcessInfo.itemLiberacaoBloqueioSituacao?.forEach(
        async (itemLiberacao: ItemLiberacaoBloqueioSituacao) => {
          const liberacao = new ItemLiberacaoBloqueioSituacaoDto(
            itemLiberacao.codLiberacaoBloqueio,
            itemLiberacao.item,
            'R',
            'Remota',
            new Date(dataLiberacao),
            1,
            cobrancaPix.LiberacaoKey.estacaoTrabalho,
            'COBRANCA DIGITAL PIX',
            'PROCESSO CANCELADO', //MSG PARA USUARIO DO BLOQUEIO
            'CANCELADO COBRANCA DIGITAL PIX - PAGAMENTO CANCELADO',
          );

          await _regraBloqueioService.setSituacao(liberacao);
          cobrancaPix.STATUS = STATUS.FINALIZADO;
          await this.fbCobrancaPixRepository.update(cobrancaPix);
        },
      );
    } catch (error: any) {}
  }

  public async Cancelar(sysId: string): Promise<void> {
    const cobrancaPix = await this.fbCobrancaPixRepository.find(sysId);
    if (cobrancaPix) {
      cobrancaPix.STATUS = STATUS.CANCELADO_SISTEMA;
      await this.fbCobrancaPixRepository.update(cobrancaPix);
    }
  }
}
