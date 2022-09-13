import CobrancaPix from '../entities/cobranca.pix';
import PagamentoPix from '../entities/pagamento.pix';
import ContractBaseRepository from '../contracts/base.repository.contract';
import LocalBaseRepositoryContract from '../contracts/local.base.repository.contract';
import CobrancaDigitalPagamentoDto from '../dto/cobranca.digital.pagamento.dto';

export default class PagamentoPixService {
  private lcRepoPgto: LocalBaseRepositoryContract<CobrancaDigitalPagamentoDto>;
  private fbRepoPgto: ContractBaseRepository<PagamentoPix>;

  constructor(
    lcRepoPgto: LocalBaseRepositoryContract<CobrancaDigitalPagamentoDto>,
    fbRepoPgto: ContractBaseRepository<PagamentoPix>,
  ) {
    this.lcRepoPgto = lcRepoPgto;
    this.fbRepoPgto = fbRepoPgto;
  }

  public async execute(params: { sysId: string; txId: string }): Promise<void> {
    try {
      const localPagamentos = await this.lcRepoPgto.selectWhere([{ key: 'SysId', value: params.sysId }]);
      const fbPagamento = await this.fbRepoPgto.findWhere('Txid', params.txId);

      fbPagamento?.forEach(async (item) => {
        const exists = localPagamentos?.find((loc) => loc.endToEndId === item.endToEndId);
        if (!exists) {
          const nextSequencia =
            localPagamentos?.reduce((acc, cur) => (acc > cur.sequencia ? acc : cur.sequencia), 0) ?? 0;

          const cobDigitalPagamentoDto = new CobrancaDigitalPagamentoDto({
            sysId: params.sysId,
            sequencia: nextSequencia + 1,
            status: 'P',
            endToEndId: item.endToEndId,
            chave: item.chave,
            dataPagamento: item.horario,
            valor: item.valor,
            observacao: item.infoPagador,
          });

          this.lcRepoPgto.insert(cobDigitalPagamentoDto);
        }
      });
    } catch (error: any) {
      throw new Error(error).message;
    }
  }
}
