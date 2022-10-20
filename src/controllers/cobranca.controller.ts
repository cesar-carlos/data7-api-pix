import fs from 'fs';
import util from 'util';

import { STATUS } from '../type/status';
import { Request, Response } from 'express';
import { eContext } from '../dependency/container.dependency';

import AppChargeValidDatabese from '../aplication/app.charge.valid.databese';
import AppChargeRequestValid from '../aplication/app.charge.request.valid';
import ResponseInfoDto from '../dto/response.info.dto';
import AppAbortCharge from '../aplication/app.abort.charge';
import AppChargeKey from '../aplication/app.charge.key';
import AppChargePix from '../aplication/app.charge.pix';
import AppDependencys from '../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../contracts/local.base.repository.contract';
import ItemLiberacaoBloqueioDto from '../dto/item.liberacao.bloqueio.dto';
import ContractBaseRepository from '../contracts/base.repository.contract';
import CobrancaPix from '../entities/cobranca.pix';
import AppRuleStatusCharge from '../aplication/app.rule.status.charge';
import CobrancaDigitalDto from '../dto/cobranca.digital.dto';

export default class CobrancaController {
  public static async get(req: Request, res: Response) {
    try {
      const path = req.headers.local_path as string;
      const readDir = util.promisify(fs.readdir);
      const files = await readDir(path);

      for (const file of files) {
        const fullPath = `${path}/${file}`;

        const fileData = fs.readFileSync(fullPath, 'utf8');
        fs.unlinkSync(fullPath);
        const jsonData = JSON.parse(fileData.toString());

        //METHOD PUT
        if (jsonData?.Method === 'PUT') {
          const proverdor = jsonData.Provedor;
          const codLiberacaoBloqueio = jsonData.Body?.CodLiberacaoBloqueio;
          const idLiberacao = jsonData.Body?.IdLiberacao;

          const localRepositoryLiberacao = AppDependencys.resolve<
            LocalBaseRepositoryContract<ItemLiberacaoBloqueioDto>
          >({
            context: proverdor?.toLocaleLowerCase() === 'sybase' ? eContext.sybase : eContext.sql_server,
            bind: 'LocalBaseRepositoryContract<ItemLiberacaoBloqueioDto>',
          });

          const localRepositoryCobranca = AppDependencys.resolve<LocalBaseRepositoryContract<CobrancaDigitalDto>>({
            context: proverdor?.toLocaleLowerCase() === 'sybase' ? eContext.sybase : eContext.sql_server,
            bind: 'LocalBaseRepositoryContract<CobrancaDigitalDto>',
          });

          const onlineRepository = AppDependencys.resolve<ContractBaseRepository<CobrancaPix>>({
            context: eContext.fireBase,
            bind: 'ContractBaseRepository<CobrancaPix>',
          });

          const appRuleStatusCharge = new AppRuleStatusCharge(
            localRepositoryLiberacao,
            localRepositoryCobranca,
            onlineRepository,
          );

          appRuleStatusCharge.execute(codLiberacaoBloqueio, idLiberacao);
          res.header('INFO-REQUEST', 'REQUEST PUT OK');
          res.status(200).send();
          return;
        }

        //METHOD DELETE
        if (jsonData?.Method === 'DELETE') {
          const appAbortCharge = new AppAbortCharge({
            sysId: jsonData.SysId,
            provedor: jsonData.Provedor,
            requerente: 'CS',
          });

          appAbortCharge.execute();
          res.header('INFO-REQUEST', 'REQUEST DELETE OK');
          res.status(200).send();
          return;
        }

        //METHOD POST
        if (jsonData?.Method === 'POST') {
          const data = jsonData.Body;

          // validação de dados de entrada
          const cobrancasOrError = AppChargeRequestValid.valid(data);
          if (cobrancasOrError instanceof ResponseInfoDto) {
            res.header(cobrancasOrError.info, cobrancasOrError.message);
            res.status(200).send(cobrancasOrError.message);
            return;
          }

          //teste de conexão com banco de dados
          const appChargeValidDatabese = new AppChargeValidDatabese();
          const responseInfoDto = await appChargeValidDatabese.execute();
          if (responseInfoDto.statusCode >= 400) {
            res.header(responseInfoDto.info, responseInfoDto.message);
            res.status(200).send(responseInfoDto.message);
            return;
          }

          // valida chave de produção
          const chaveOrError = await AppChargeKey.get();
          if (chaveOrError instanceof ResponseInfoDto) {
            res.header(chaveOrError.info, chaveOrError.message);
            res.status(200).send(chaveOrError.message);
            return;
          }

          //inicia processo de cobrança
          const appChargePix = new AppChargePix(cobrancasOrError);
          const responseChargePix = await appChargePix.execute();
          if (responseChargePix instanceof ResponseInfoDto) {
            res.header(responseChargePix.info, responseChargePix.message);
            res.status(200).send(responseChargePix.message);
            return;
          }

          //return
          res.header('INFO-REQUEST', STATUS.MENSAGEM_BLOQUEIO);
          res.status(204).send();
          return;
        }
      }

      res.status(204).send();
    } catch (err: any) {
      res.header('INFO-REQUEST', err.message);
      res.status(204).send();
      return;
    }
  }

  public static async post(req: Request, res: Response) {
    try {
      const data = req.body;

      // validação de dados de entrada
      const cobrancasOrError = AppChargeRequestValid.valid(data);
      if (cobrancasOrError instanceof ResponseInfoDto) {
        res.header(cobrancasOrError.info, cobrancasOrError.message);
        res.status(cobrancasOrError.statusCode).send(cobrancasOrError.message);
        return;
      }

      //teste de conexão com banco de dados
      const appChargeValidDatabese = new AppChargeValidDatabese();
      const responseInfoDto = await appChargeValidDatabese.execute();
      if (responseInfoDto.statusCode >= 400) {
        res.header(responseInfoDto.info, responseInfoDto.message);
        res.status(responseInfoDto.statusCode).send(responseInfoDto.message);
        return;
      }

      // valida chave de produção
      const chaveOrError = await AppChargeKey.get();
      if (chaveOrError instanceof ResponseInfoDto) {
        res.header(chaveOrError.info, chaveOrError.message);
        res.status(chaveOrError.statusCode).send(chaveOrError.message);
        return;
      }

      //inicia processo de cobrança
      const appChargePix = new AppChargePix(cobrancasOrError);
      const responseChargePix = await appChargePix.execute();
      if (responseChargePix instanceof ResponseInfoDto) {
        res.header(responseChargePix.info, responseChargePix.message);
        res.status(responseChargePix.statusCode).send(responseChargePix.message);
        return;
      }

      res.header('INFO-REQUEST', STATUS.MENSAGEM_BLOQUEIO);
      res.status(204).send();
    } catch (error: any) {
      const err = new ResponseInfoDto({ info: 'INFO-REQUEST', message: error.message, statusCode: 500 });
      res.header(err.info, err.message);
      res.status(err.statusCode).send(error.message);
    }
  }

  // PUT
  public static put(req: Request, res: Response) {
    const { Provedor, CodLiberacaoBloqueio, IdLiberacao } = req.query;

    const proverdor = Provedor as string;
    const codLiberacaoBloqueio = parseInt(CodLiberacaoBloqueio as string);
    const idLiberacao = parseInt(IdLiberacao as string);

    const localRepositoryLiberacao = AppDependencys.resolve<LocalBaseRepositoryContract<ItemLiberacaoBloqueioDto>>({
      context: proverdor?.toLocaleLowerCase() === 'sybase' ? eContext.sybase : eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<ItemLiberacaoBloqueioDto>',
    });

    const localRepositoryCobranca = AppDependencys.resolve<LocalBaseRepositoryContract<CobrancaDigitalDto>>({
      context: proverdor?.toLocaleLowerCase() === 'sybase' ? eContext.sybase : eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<CobrancaDigitalDto>',
    });

    const onlineRepository = AppDependencys.resolve<ContractBaseRepository<CobrancaPix>>({
      context: eContext.fireBase,
      bind: 'ContractBaseRepository<CobrancaPix>',
    });

    const appRuleStatusCharge = new AppRuleStatusCharge(
      localRepositoryLiberacao,
      localRepositoryCobranca,
      onlineRepository,
    );

    appRuleStatusCharge.execute(codLiberacaoBloqueio, idLiberacao);
    res.status(204).send();
  }

  //  DELETE
  public static delete(req: Request, res: Response) {
    try {
      const provedor = req.query.provedor as string;
      const sysId = req.params.sysId as string;

      if (!sysId || !provedor) {
        const err = new ResponseInfoDto({
          info: 'INFO-REQUEST',
          message: 'sysId not found or provedor not found',
          statusCode: 400,
        });

        res.header(err.info, err.message);
        return;
      }

      const appAbortCharge = new AppAbortCharge({
        sysId: sysId,
        provedor: provedor,
        requerente: 'CS',
      });

      appAbortCharge.execute();
      res.status(204).send();
    } catch (error: any) {
      const err = new ResponseInfoDto({ info: 'INFO-REQUEST', message: error.message, statusCode: 500 });
      res.header(err.info, err.message);
      res.status(err.statusCode).send(error.message);
    }
  }
}
