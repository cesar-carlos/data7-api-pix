import { requestCobrancaDto } from '../dto/request.cobranca.dto';

import ResponseInfoDto from '../dto/response.info.dto';

export default class AppChargeRequestValid {
  public static valid(data: any): ResponseInfoDto | requestCobrancaDto[] {
    if (!data) return new ResponseInfoDto({ info: 'INFO-REQUEST', message: 'data not found', statusCode: 400 });
    if (!data?.Data) return new ResponseInfoDto({ info: 'INFO-REQUEST', message: 'data not found', statusCode: 400 });

    if (data?.Data?.length === 0)
      return new ResponseInfoDto({ info: 'INFO-REQUEST', message: 'data invalid', statusCode: 400 });

    try {
      const cobrancas = data.Data.map((item: any) => {
        const cobSysId = item?.Parcelas[0].SysId.toString().split('-')[0].trim();

        return {
          CobSysId: cobSysId,
          DataBase: item?.DataBase,
          Filial: item?.Filial,
          Usuario: item?.Usuario,
          Cliente: item?.Cliente,
          Parcelas: item?.Parcelas.map((parcela: any) => {
            const { LiberacaoKey } = parcela;
            return {
              SysId: parcela?.SysId,
              Origem: parcela?.Origem,
              CodOrigem: parcela?.CodOrigem,
              LiberacaoKey: {
                CodEmpresa: LiberacaoKey?.CodEmpresa,
                CodFilial: LiberacaoKey?.CodFilial,
                CNPJ: LiberacaoKey?.CNPJ,
                IdLiberacao: LiberacaoKey?.IdLiberacao,
                Origem: LiberacaoKey?.Origem,
                CodOrigem: LiberacaoKey?.CodOrigem,
                Item: LiberacaoKey?.Item,
                nomeUsuario: LiberacaoKey?.nomeUsuario,
                estacaoTrabalho: LiberacaoKey?.estacaoTrabalho,
                IP: LiberacaoKey?.IP,
              },

              NumeroParcela: parcela?.NumeroParcela,
              QtdParcela: parcela?.QtdParcela,
              TipoCobranca: parcela?.TipoCobranca,
              DataEmissao: new Date(parcela?.DataEmissao),
              DataVenda: new Date(parcela?.DataVenda),
              DataVencimento: new Date(parcela?.DataVencimento),
              ValorParcela: parseFloat(parcela?.ValorParcela),
              Observacao: parcela?.Observacao,
            };
          }),
        };
      });

      return cobrancas;
    } catch (error: any) {
      const err = new ResponseInfoDto({ info: 'INFO-REQUEST', message: error.message, statusCode: 400 });
      return err;
    }
  }
}
