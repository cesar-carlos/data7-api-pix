import { Request, Response } from 'express';
import { requestCobrancaDto } from '../dto/request.cobranca.dto';

import ChaveDto from '../dto/chave.dto';
import ResponseInfoDto from '../dto/response.info.dto';
import ProcessInfo from '../entities/process.info';

import FirebaseCobrancaPixRepository from '../repository/firebase.cobranca.pix.repository';
import LocalStorageChaveRepository from '../repository/local.storage.chave.repository';
import CancelamentoPixService from '../services/cancelamento.pix.service';
import ChaveProducaoService from '../services/chave.producao.service';
import CobrancaPixService from '../services/cobranca.pix.service';
import CobrancaService from '../services/cobranca.service';

import LocalSqlServerCobrancaDigitalTituloRepository from '../repository/local.sql.server.cobranca.digital.titulo.repository';
import DatabaseStatusService from '../services/database.status.service';
import ManagementDependencys from '../aplication/management.dependencys';
import DataBaseActiveContract from '../contracts/data.base.active.contract';
import DatabaseOnlineDto from '../dto/database.online.dto';
import { eContext } from '../dependency/container.dependency';
import { ProcessInfoStatusType } from '../type/process.info.status.type';

export default class CobrancaController {
  constructor() {}

  public static async get(req: Request, res: Response) {
    throw new Error('not implemented get');
  }

  public static async post(req: Request, res: Response) {
    try {
      const data = req.body;

      // validação de dados de entrada
      const cobrancasOrError = CobrancaController.validRequest(data);
      if (cobrancasOrError instanceof ResponseInfoDto) {
        res.header(cobrancasOrError.info, cobrancasOrError.message);
        res.status(cobrancasOrError.statusCode).send(cobrancasOrError.message);
        return;
      }

      // local database config
      const dataConf = cobrancasOrError[0]?.DataBase;
      if (!dataConf) {
        const err = new ResponseInfoDto({
          info: 'INFO-REQUEST',
          message: 'DataBase config not found',
          statusCode: 400,
        });

        res.header(err.info, err.message);
        res.status(err.statusCode).send(err.message);
        return;
      }

      //teste de conexão com banco de dados
      const localRepository = ManagementDependencys.resolve<DataBaseActiveContract<DatabaseOnlineDto>>({
        context: dataConf.Provedor.toLocaleLowerCase() === 'sybase' ? eContext.sybase : eContext.sql_server,
        bind: 'DataBaseActiveContract<DatabaseOnlineDto>',
      });

      const onlineRepository = ManagementDependencys.resolve<DataBaseActiveContract<DatabaseOnlineDto>>({
        context: eContext.fireBase,
        bind: 'DataBaseActiveContract<DatabaseOnlineDto>',
      });

      const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
      const processInfoDataBase = await new DatabaseStatusService([localRepository, onlineRepository]).execute();
      if (processInfoDataBase.process.status === infoStatusErro.status) {
        const err = new ResponseInfoDto({
          info: 'INFO-REQUEST',
          message: processInfoDataBase.info ?? '',
          statusCode: 400,
        });

        res.header(err.info, err.message);
        res.status(err.statusCode).send(err.message);
        return;
      }

      // valida chave de produção
      const chaveOrError = await CobrancaController.getChave();
      if (chaveOrError instanceof ResponseInfoDto) {
        res.header(chaveOrError.info, chaveOrError.message);
        res.status(chaveOrError.statusCode).send(chaveOrError.message);
        return;
      }

      //inicia processo de cobrança
      //TOP TOP TOP
      for (const cobranca of cobrancasOrError) {
        const cobrancaService = new CobrancaService(chaveOrError);
        const processInfoOrCobranca = await cobrancaService.executar(cobranca);

        //ERROR
        if (processInfoOrCobranca instanceof ProcessInfo) {
          const err = new ResponseInfoDto({
            info: 'INFO-REQUEST',
            message: processInfoOrCobranca.info || '',
            statusCode: 400,
          });

          res.header(err.info, err.message);
          res.status(err.statusCode).send(err.message);
          return;
        }

        //START CREATE PIX
        const cobrancaPixService = new CobrancaPixService(new FirebaseCobrancaPixRepository());
        const processInfoOrCobrancaPix = await cobrancaPixService.execute(processInfoOrCobranca);

        //ERROR
        if (processInfoOrCobrancaPix instanceof ProcessInfo) {
          const err = new ResponseInfoDto({
            info: 'INFO-REQUEST',
            message: processInfoOrCobrancaPix.info || '',
            statusCode: 400,
          });

          res.header(err.info, err.message);
          res.status(err.statusCode).send(err.message);
          return;
        }
      }

      res.header('INFO-REQUEST', 'PIX: AGUARDE CONFIRMACAO DE PAGAMENTO');
      res.status(204).send();
    } catch (error: any) {
      const err = new ResponseInfoDto({ info: 'INFO-REQUEST', message: error.message, statusCode: 500 });
      res.header(err.info, err.message);
      res.status(err.statusCode).send(error.message);
    }
  }

  public static put(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static delete(req: Request, res: Response) {
    const { sysId } = req.params;

    if (!sysId) {
      const err = new ResponseInfoDto({
        info: 'INFO-REQUEST',
        message: 'SysId not found',
        statusCode: 400,
      });

      res.header(err.info, err.message);
      return;
    }

    const cancelamentoPixService = new CancelamentoPixService(
      new LocalSqlServerCobrancaDigitalTituloRepository(),
      new FirebaseCobrancaPixRepository(),
    );

    cancelamentoPixService.execute({ sysId: sysId, status: 'CS' });
    res.status(204).send();
  }

  private static validRequest(data: any): ResponseInfoDto | requestCobrancaDto[] {
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

  private static async getChave(): Promise<ResponseInfoDto | ChaveDto> {
    const repository = new LocalStorageChaveRepository();
    const chave = await new ChaveProducaoService(repository).execute();
    if (!chave) {
      return new ResponseInfoDto({ info: 'INFO-REQUEST', message: 'chave not found', statusCode: 400 });
    }

    return chave;
  }
}
