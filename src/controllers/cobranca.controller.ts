import { Request, Response } from 'express';
import { requestCobrancaDto } from '../dto/request.cobranca.dto';

import { eContext } from '../dependency/container.dependency';
import { ProcessInfoStatusType } from '../type/process.info.status.type';

import ChaveDto from '../dto/chave.dto';
import ResponseInfoDto from '../dto/response.info.dto';
import ProcessInfo from '../entities/process.info';

import LocalStorageChaveRepository from '../repository/local.storage.chave.repository';
import CancelamentoPixService from '../services/cancelamento.pix.service';
import ChaveProducaoService from '../services/chave.producao.service';
import CobrancaPixService from '../services/cobranca.pix.service';
import CobrancaService from '../services/cobranca.service';

import CobrancaPix from '../entities/cobranca.pix';
import DatabaseStatusService from '../services/database.status.service';
import AppDependencys from '../aplication/app.dependencys';
import DataBaseActiveContract from '../contracts/data.base.active.contract';
import DatabaseOnlineDto from '../dto/database.online.dto';
import ContractBaseRepository from '../contracts/base.repository.contract';
import LocalBaseRepositoryContract from '../contracts/local.base.repository.contract';
import CobrancaDigitalPixDto from '../dto/cobranca.digital.pix.dto';
import CobrancaDigitalTituloDto from '../dto/cobranca.digital.titulo.dto';

export default class CobrancaController {
  public static async get(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
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
      const ActiveLocalRepo = AppDependencys.resolve<DataBaseActiveContract<DatabaseOnlineDto>>({
        context: dataConf.Provedor.toLocaleLowerCase() === 'sybase' ? eContext.sybase : eContext.sql_server,
        bind: 'DataBaseActiveContract<DatabaseOnlineDto>',
      });

      const ActiveOnlineRepo = AppDependencys.resolve<DataBaseActiveContract<DatabaseOnlineDto>>({
        context: eContext.fireBase,
        bind: 'DataBaseActiveContract<DatabaseOnlineDto>',
      });

      const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
      const processInfoDataBase = await new DatabaseStatusService([ActiveLocalRepo, ActiveOnlineRepo]).execute();
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

        //START CREATE PIX - DEPENDENCIAS
        const cobOnlineRepo = AppDependencys.resolve<ContractBaseRepository<CobrancaPix>>({
          context: eContext.fireBase,
          bind: 'ContractBaseRepository<CobrancaPix>',
        });

        const cobLocalRepo = AppDependencys.resolve<LocalBaseRepositoryContract<CobrancaDigitalPixDto>>({
          context: dataConf.Provedor.toLocaleLowerCase() === 'sybase' ? eContext.sybase : eContext.sql_server,
          bind: 'LocalBaseRepositoryContract<CobrancaDigitalPixDto>',
        });

        const cobrancaPixService = new CobrancaPixService(cobLocalRepo, cobOnlineRepo);
        const processInfoOrCobrancaPix = await cobrancaPixService.execute(processInfoOrCobranca);

        //
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
    try {
      const { provedor } = req.query;
      const { sysId } = req.params;

      if (!sysId || !provedor) {
        const err = new ResponseInfoDto({
          info: 'INFO-REQUEST',
          message: 'sysId not found or provedor not found',
          statusCode: 400,
        });

        res.header(err.info, err.message);
        return;
      }

      const cobTituloLocalRepo = AppDependencys.resolve<LocalBaseRepositoryContract<CobrancaDigitalTituloDto>>({
        context: (provedor as string).toLocaleLowerCase() === 'sybase' ? eContext.sybase : eContext.sql_server,
        bind: 'LocalBaseRepositoryContract<CobrancaDigitalTituloDto>',
      });

      const cobOnlineRepo = AppDependencys.resolve<ContractBaseRepository<CobrancaPix>>({
        context: eContext.fireBase,
        bind: 'ContractBaseRepository<CobrancaPix>',
      });

      const cancelamentoPixService = new CancelamentoPixService(cobTituloLocalRepo, cobOnlineRepo);
      cancelamentoPixService.execute({ sysId: sysId, status: 'CS' });
      res.status(204).send();
    } catch (error: any) {
      const err = new ResponseInfoDto({ info: 'INFO-REQUEST', message: error.message, statusCode: 500 });
      res.header(err.info, err.message);
      res.status(err.statusCode).send(error.message);
    }
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
