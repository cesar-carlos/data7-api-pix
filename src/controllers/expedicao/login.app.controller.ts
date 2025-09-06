import { Request, Response } from 'express';

import { LoginRequest } from '../../validation/login.validation';
import { ConsultaLoginAppQuery } from '../../validation/consulta.login.app.validation';
import ConsultaLoginAppService from '../../services/consulta.login.app.service';
import LoginAppService from '../../services/login.app.service';

export default class LoginAppController {
  public static async get(req: Request, res: Response): Promise<void> {
    try {
      const consultaService = new ConsultaLoginAppService();
      const { nome, codLoginApp, ativo, page, limit } = (req as any).validatedQuery as ConsultaLoginAppQuery;

      const currentPage = page;
      const currentLimit = limit;

      let resultado;

      if (codLoginApp) {
        resultado = await consultaService.consultarPorCodigo(codLoginApp);
        if (!resultado) {
          res.status(404).send({
            message: 'Usuário não encontrado',
          });
          return;
        }

        res.status(200).send({
          message: 'Usuário encontrado',
          data: resultado,
          total: 1,
        });
        return;
      }

      if (nome) {
        resultado = await consultaService.consultarPorNome(nome, currentPage, currentLimit);
        res.status(200).send({
          message: `${resultado.total} usuário(s) encontrado(s)`,
          data: resultado.data,
          total: resultado.total,
          page: resultado.page,
          limit: resultado.limit,
          totalPages: resultado.totalPages,
        });
        return;
      }

      if (ativo === 'S') {
        resultado = await consultaService.consultarAtivos(currentPage, currentLimit);
        res.status(200).send({
          message: `${resultado.total} usuário(s) ativo(s) encontrado(s)`,
          data: resultado.data,
          total: resultado.total,
          page: resultado.page,
          limit: resultado.limit,
          totalPages: resultado.totalPages,
        });
        return;
      }

      resultado = await consultaService.consultarTodos(currentPage, currentLimit);
      res.status(200).send({
        message: `${resultado.total} usuário(s) encontrado(s)`,
        data: resultado.data,
        total: resultado.total,
        page: resultado.page,
        limit: resultado.limit,
        totalPages: resultado.totalPages,
      });
    } catch (error: any) {
      res.status(400).send({
        message: `Erro na consulta: ${error.message}`,
      });
    }
  }

  public static async post(req: Request, res: Response): Promise<void> {
    try {
      const loginAppService = new LoginAppService();
      const { Nome, Senha }: LoginRequest = req.body;
      const user = await loginAppService.authenticate({ Nome, Senha });

      if (!user) {
        res.status(401).send({
          message: 'Credenciais inválidas ou usuário inativo',
        });
        return;
      }

      const { Senha: _, ...userWithoutPassword } = user;

      res.status(200).send({
        message: 'Login realizado com sucesso',
        user: userWithoutPassword,
      });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  public static put(req: Request, res: Response): void {
    res.status(404).send({ message: 'not implemented put' });
  }

  public static delete(req: Request, res: Response): void {
    res.status(404).send({ message: 'not implemented delete' });
  }
}
