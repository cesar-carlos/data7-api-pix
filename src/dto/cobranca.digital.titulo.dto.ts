import { liberacaoKeyDto } from './liberacao.key.dto';

export default class CobrancaDigitalTituloDto {
  constructor(
    readonly codEmpresa: number,
    readonly codCobrancaDigital: number,
    readonly item: string,
    readonly sysId: string,
    readonly status: string,
    readonly tipoCobranca: string,
    readonly numeroTitulo: string,
    readonly parcela: string,
    readonly qtdParcelas: number | null,
    readonly liberacaoKey: string,
    readonly dataLancamento: Date,
    readonly dataEmissao: Date,
    readonly dataVenda: Date,
    readonly dataVencimento: Date,
    readonly valor: number,
    readonly observacao: string,
  ) {}

  public static fromObject(obj: any): CobrancaDigitalTituloDto {
    return new CobrancaDigitalTituloDto(
      obj.codEmpresa || obj.CodEmpresa,
      obj.codCobrancaDigital || obj.CodCobrancaDigital,
      obj.item || obj.Item,
      obj.sysId || obj.SysId,
      obj.status || obj.Status,
      obj.tipoCobranca || obj.TipoCobranca,
      obj.numeroTitulo || obj.NumeroTitulo,
      obj.parcela || obj.Parcela,
      obj.qtdParcelas || obj.QtdParcelas || 0,
      obj.liberacaoKey || obj.LiberacaoKey,
      obj.dataLancamento || obj.DataLancamento,
      obj.dataEmissao || obj.DataEmissao,
      obj.dataVenda || obj.DataVenda,
      obj.dataVencimento || obj.DataVencimento,
      obj.valor || obj.Valor,
      obj.observacao || obj.Observacao,
    );
  }
}
