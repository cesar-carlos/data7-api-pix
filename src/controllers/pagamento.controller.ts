import { Request, Response } from 'express';
import { eContext } from '../dependency/container.dependency';

import AppDependencys from '../aplication/app.dependencys';
import ContractBaseRepository from '../contracts/base.repository.contract';
import CobrancaPixConsultaPagamentoService from '../services/cobranca.pix.consulta.pagamento.service';
import LocalBaseRepositoryContract from '../contracts/local.base.repository.contract';
import CobrancaDigitalPixDto from '../dto/cobranca.digital.pix.dto';
import CobrancaPixLiberacaoBloqueioService from '../services/cobranca.pix.liberacao.bloqueio.service';
import CobrancaDigitalDto from '../dto/cobranca.digital.dto';
import CobrancaDigitalTituloDto from '../dto/cobranca.digital.titulo.dto';
import ItemLiberacaoBloqueioDto from '../dto/item.liberacao.bloqueio.dto';
import PagamentoPix from '../entities/pagamento.pix';
import CobrancaPix from '../entities/cobranca.pix';

export default class PagamentoController {
  public static async get(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static async getOrigem(req: Request, res: Response) {
    const { chave, origem, codOrigem } = req.query;

    if (!chave || !origem || !codOrigem) {
      res.status(400).send({ message: 'invalid parameters' });
      return;
    }

    const localDataPagamentoPix = AppDependencys.resolve<LocalBaseRepositoryContract<CobrancaDigitalPixDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<CobrancaDigitalPixDto>',
    });

    const onlineDataPagamentoPix = AppDependencys.resolve<ContractBaseRepository<PagamentoPix>>({
      context: process.env.ONLINE_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'ContractBaseRepository<PagamentoPix>',
    });

    const cobrancaPixConsultaPagamentoService = new CobrancaPixConsultaPagamentoService(
      localDataPagamentoPix,
      onlineDataPagamentoPix,
    );

    const result = await cobrancaPixConsultaPagamentoService.execute(
      chave as string,
      origem as string,
      Number(codOrigem),
    );
    if (!result) {
      res.status(404).send({ message: 'not found' });
      return;
    }

    res.status(200).send(result);
  }

  public static async post(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static async put(req: Request, res: Response) {
    try {
      const body = { ...req.body };
      const localRepoCobrancaDigital = AppDependencys.resolve<LocalBaseRepositoryContract<CobrancaDigitalDto>>({
        context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
        bind: 'LocalBaseRepositoryContract<CobrancaDigitalDto>',
      });

      const localRepoCobrancaDigitalTitulo = AppDependencys.resolve<
        LocalBaseRepositoryContract<CobrancaDigitalTituloDto>
      >({
        context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
        bind: 'LocalBaseRepositoryContract<CobrancaDigitalTituloDto>',
      });

      const localRepoCobrancaDigitalPix = AppDependencys.resolve<LocalBaseRepositoryContract<CobrancaDigitalPixDto>>({
        context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
        bind: 'LocalBaseRepositoryContract<CobrancaDigitalPixDto>',
      });

      const localRepoItemLiberacaoBloqueio = AppDependencys.resolve<
        LocalBaseRepositoryContract<ItemLiberacaoBloqueioDto>
      >({
        context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
        bind: 'LocalBaseRepositoryContract<ItemLiberacaoBloqueioDto>',
      });

      const onlineCobrancaPix = AppDependencys.resolve<ContractBaseRepository<CobrancaPix>>({
        context: process.env.ONLINE_DATABASE?.toLocaleLowerCase() as eContext,
        bind: 'ContractBaseRepository<CobrancaPix>',
      });

      const onlineDataPagamentoPix = AppDependencys.resolve<ContractBaseRepository<PagamentoPix>>({
        context: process.env.ONLINE_DATABASE?.toLocaleLowerCase() as eContext,
        bind: 'ContractBaseRepository<PagamentoPix>',
      });

      const cobrancaPixLiberacaoBloqueioService = new CobrancaPixLiberacaoBloqueioService(
        localRepoCobrancaDigital,
        localRepoCobrancaDigitalTitulo,
        localRepoCobrancaDigitalPix,
        localRepoItemLiberacaoBloqueio,
        onlineCobrancaPix,
        onlineDataPagamentoPix,
      );

      if (body.CodEmpresa && body.CodCobrancaDigital && body.Parcela && body.Tipo === 'LIBERACAO-REGRA') {
        const fromIdLiberacao = await cobrancaPixLiberacaoBloqueioService.fromIdLiberacao(
          body.CodEmpresa,
          body.CodCobrancaDigital,
          body.Parcela,
        );

        if (fromIdLiberacao.process.status === 'error') {
          res.status(500).send({ message: fromIdLiberacao.result, info: fromIdLiberacao.info });
          return;
        }

        return res.status(200).send(fromIdLiberacao);
      }

      if (body.CodEmpresa && body.Origem && body.CodOrigem && body.Parcela && body.Tipo === 'LIBERACAO-REGRA') {
        const fromOrigem = await cobrancaPixLiberacaoBloqueioService.fromOrigem(
          body.Origem,
          body.CodOrigem,
          body.Parcela,
        );
        return res.status(200).send(fromOrigem);
      }

      res.status(204).send();
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  }

  public static delete(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }
}
