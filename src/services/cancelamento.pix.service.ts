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
import { liberacaoKeyDto } from '../dto/liberacao.key.dto';

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

      const liberacaoKey: liberacaoKeyDto = {
        codEmpresa: cobrancaPix.liberacaoKey.codEmpresa,
        codFilial: cobrancaPix.liberacaoKey.codFilial,
        CNPJ: cobrancaPix.liberacaoKey.cnpj,
        idLiberacao: cobrancaPix.liberacaoKey.idLiberacao,
        origem: cobrancaPix.liberacaoKey.origem,
        codOrigem: cobrancaPix.liberacaoKey.codOrigem,
        item: cobrancaPix.liberacaoKey.item,
        nomeUsuario: cobrancaPix.liberacaoKey.nomeUsuario,
        estacaoTrabalho: cobrancaPix.liberacaoKey.estacaoTrabalho,
        IP: cobrancaPix.liberacaoKey.ip,
      };

      const bloqueioOrProcessInfo = await _regraBloqueioService.findOneFromLiberacaoKey(liberacaoKey);
      if (bloqueioOrProcessInfo instanceof ProcessInfo) {
        return;
      }

      //LIBERAR RECUSA CANCELADO_CLIENTE
      if (cobrancaPix.STATUS === STATUS.CANCELADO_CLIENTE) {
        const dataRecusa = moment().utc().format('YYYY-MM-DD HH:mm:ss');
        bloqueioOrProcessInfo.itemLiberacaoBloqueioSituacao?.forEach(
          async (itemLiberacao: ItemLiberacaoBloqueioSituacao) => {
            const liberacao = new ItemLiberacaoBloqueioSituacaoDto(
              itemLiberacao.codLiberacaoBloqueio,
              itemLiberacao.item,
              'R',
              'Remota',
              new Date(dataRecusa),
              1,
              cobrancaPix.liberacaoKey.estacaoTrabalho,
              'COBRANCA DIGITAL PIX',
              cobrancaPix.STATUS,
              'CANCELADO COBRANCA DIGITAL PIX - PAGAMENTO CANCELADO',
            );

            await _regraBloqueioService.setSituacao(liberacao);
          },
        );
      }
    } catch (error: any) {}
  }

  public async Cancelar(sysId: string): Promise<void> {
    const cobrancaPix = await this.fbCobrancaPixRepository.find(sysId);
    if (cobrancaPix && cobrancaPix.STATUS === STATUS.ATIVO) {
      cobrancaPix.STATUS = STATUS.CANCELADO_SISTEMA;
      await this.fbCobrancaPixRepository.update(cobrancaPix);
    }
  }
}
