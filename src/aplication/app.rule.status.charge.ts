import { STATUS } from '../type/status';

import LocalBaseRepositoryContract from '../contracts/local.base.repository.contract';
import ItemLiberacaoBloqueioDto from '../dto/item.liberacao.bloqueio.dto';
import ContractBaseRepository from '../contracts/base.repository.contract';
import CobrancaDigitalDto from '../dto/cobranca.digital.dto';
import CobrancaPix from '../entities/cobranca.pix';

export default class AppRuleStatusCharge {
  constructor(
    private localRepositoryLiberacao: LocalBaseRepositoryContract<ItemLiberacaoBloqueioDto>,
    private localRepositoryCobranca: LocalBaseRepositoryContract<CobrancaDigitalDto>,
    private onlineRepositoryCobranca: ContractBaseRepository<CobrancaPix>,
  ) {}

  async execute(codLiberacaoBloqueio: number, idLiberacao: number): Promise<void> {
    const itensLiberacaoBloqueio = await this.localRepositoryLiberacao.selectWhere([
      { key: 'CodLiberacaoBloqueio ', value: codLiberacaoBloqueio },
    ]);

    const status = this.rule(itensLiberacaoBloqueio);

    // ATUALIZA STATUS DA COBRANCA DIGITAL ATIVO
    if (status === STATUS.ATIVO) {
      const cobrancasOnLine = await this.onlineRepositoryCobranca.findWhere(
        'liberacaoKey.idLiberacao',
        idLiberacao.toString(),
      );

      // COBRANÇAS ONLINE NÃO ENCONTRADAS
      if (cobrancasOnLine === undefined || cobrancasOnLine.length <= 0) {
        itensLiberacaoBloqueio?.forEach(async (item) => {
          if (item.status === 'B' && item.mensagemBloqueio.trim() === `INFO-REQUEST: ${STATUS.MENSAGEM_BLOQUEIO}`) {
            item.status = 'R';
            item.motivoRejeicaoLiberacaoBloqueio = 'Cobrança não encontrada na base de dados online';
            await this.localRepositoryLiberacao.update(item);
          }
        });
      }

      //ATIVA COBRANCA PIX ONLINE
      cobrancasOnLine?.forEach(async (cobranca) => {
        if (cobranca.STATUS === STATUS.AGUARDANDO) {
          cobranca.STATUS = STATUS.ATIVO;
          await this.onlineRepositoryCobranca.update(cobranca);
        }
      });
    }

    //
    // ATUALIZA STATUS DA COBRANCA DIGITAL
    if (status === STATUS.CANCELADO_SISTEMA) {
      const cobrancasOnLine = await this.onlineRepositoryCobranca.findWhere(
        'liberacaoKey.idLiberacao',
        idLiberacao.toString(),
      );

      const cobrancasLocal = await this.localRepositoryCobranca.selectWhere([
        { key: 'CodCobrancaDigital ', value: idLiberacao },
      ]);

      cobrancasLocal?.forEach(async (cobranca) => {
        if (cobranca.situacao === STATUS.ATIVO) {
          cobranca.situacao = STATUS.CANCELADO_SISTEMA;
          await this.localRepositoryCobranca.update(cobranca);
        }
      });

      cobrancasOnLine?.forEach(async (cobranca) => {
        if (cobranca.STATUS === STATUS.AGUARDANDO) {
          cobranca.STATUS = STATUS.CANCELADO_SISTEMA;
          await this.onlineRepositoryCobranca.update(cobranca);
        }
      });

      itensLiberacaoBloqueio?.forEach(async (item) => {
        if (item.status === 'B' && item.mensagemBloqueio.trim() === `INFO-REQUEST: ${STATUS.MENSAGEM_BLOQUEIO}`) {
          item.status = 'R';
          item.motivoRejeicaoLiberacaoBloqueio = 'Cobrança não encontrada na base de dados online';
          await this.localRepositoryLiberacao.update(item);
        }
      });
    }
  }

  // REGRA
  private rule(itensLiberacaoBloqueio?: ItemLiberacaoBloqueioDto[]): STATUS {
    if (itensLiberacaoBloqueio === undefined) return STATUS.CANCELADO_SISTEMA;
    if (itensLiberacaoBloqueio.length <= 0) return STATUS.CANCELADO_SISTEMA;

    for (const item of itensLiberacaoBloqueio) {
      if (item.status === 'B' && item.mensagemBloqueio.trim() !== `INFO-REQUEST: ${STATUS.MENSAGEM_BLOQUEIO}`) {
        return STATUS.AGUARDANDO;
      }

      if (item.status === 'R') return STATUS.CANCELADO_SISTEMA;
    }

    return STATUS.ATIVO;
  }
}
