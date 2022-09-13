import { STATUS } from '../type/status';

import CobrancaPix from '../entities/cobranca.pix';
import ContractBaseRepository from '../contracts/base.repository.contract';
import CobrancaDigitalTituloDto from '../dto/cobranca.digital.titulo.dto';
import LocalBaseRepositoryContract from '../contracts/local.base.repository.contract';

export default class CancelamentoPixService {
  private repo: LocalBaseRepositoryContract<CobrancaDigitalTituloDto>;
  private fbRepo: ContractBaseRepository<CobrancaPix>;

  constructor(
    repo: LocalBaseRepositoryContract<CobrancaDigitalTituloDto>,
    fbRepo: ContractBaseRepository<CobrancaPix>,
  ) {
    this.repo = repo;
    this.fbRepo = fbRepo;
  }

  public async execute(params: { sysId: string; status: string }): Promise<void> {
    //CANCELADO-CLIENTE
    if (params.status === 'CC') {
      const titulos = await this.repo.selectWhere([{ key: 'SysId ', value: params.sysId }]);
      titulos?.forEach(async (titulo) => {
        const upTitulo = new CobrancaDigitalTituloDto({
          codEmpresa: titulo.codEmpresa,
          codCobrancaDigital: titulo.codCobrancaDigital,
          item: titulo.item,
          sysId: titulo.sysId,
          status: params.status,
          tipoCobranca: titulo.tipoCobranca,
          numeroTitulo: titulo.numeroTitulo,
          parcela: titulo.parcela,
          qtdParcelas: titulo.qtdParcelas,
          liberacaoKey: titulo.liberacaoKey,
          dataLancamento: titulo.dataLancamento,
          dataEmissao: titulo.dataEmissao,
          dataVenda: titulo.dataVenda,
          dataVencimento: titulo.dataVencimento,
          valor: titulo.valor,
          observacao: titulo.observacao,
        });

        await this.repo.update(upTitulo);
      });
    }

    //CANCELADO-SISTEMA
    if (params.status === 'CS') {
      const fbTitulo = await this.fbRepo.find(params.sysId);
      if (fbTitulo) {
        if (fbTitulo.STATUS === STATUS.ATIVO) {
          fbTitulo.STATUS = STATUS.CANCELADO_SISTEMA;
          await this.fbRepo.update(fbTitulo);
        }
      }
    }
  }
}
