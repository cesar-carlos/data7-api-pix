import { Request, Response } from 'express';

import { UsuarioConsultaQuery } from '../../validation/usuario.consulta.validation';
import UsuarioConsultaService from '../../services/usuario.consulta.service';

export default class UsuarioConsultaController {
  public static async get(req: Request, res: Response): Promise<void> {
    try {
      const usuarioConsultaService = new UsuarioConsultaService();
      const { codUsuario, nomeUsuario, codEmpresa, ativo, page, limit } = (req as any)
        .validatedQuery as UsuarioConsultaQuery;

      const currentPage = page;
      const currentLimit = limit;

      let resultado;

      if (codUsuario) {
        resultado = await usuarioConsultaService.consultarPorCodigo(codUsuario);
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

      if (nomeUsuario) {
        resultado = await usuarioConsultaService.consultarPorNome(nomeUsuario, currentPage, currentLimit);
        res.status(200).send({
          message: `${resultado.total} usuário(s) encontrado(s) com nome "${nomeUsuario}"`,
          data: resultado.data,
          total: resultado.total,
          page: resultado.page,
          limit: resultado.limit,
          totalPages: resultado.totalPages,
        });
        return;
      }

      if (codEmpresa) {
        resultado = await usuarioConsultaService.consultarPorEmpresa(codEmpresa, currentPage, currentLimit);
        res.status(200).send({
          message: `${resultado.total} usuário(s) encontrado(s) na empresa ${codEmpresa}`,
          data: resultado.data,
          total: resultado.total,
          page: resultado.page,
          limit: resultado.limit,
          totalPages: resultado.totalPages,
        });
        return;
      }

      if (ativo === 'S') {
        resultado = await usuarioConsultaService.consultarAtivos(currentPage, currentLimit);
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

      resultado = await usuarioConsultaService.consultarTodos(currentPage, currentLimit);
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
        message: `Erro na consulta de usuários: ${error.message}`,
      });
    }
  }

  public static async post(req: Request, res: Response): Promise<void> {
    res.status(405).send({
      message: 'Método POST não permitido para consulta de usuários. Use GET.',
    });
  }

  public static async put(req: Request, res: Response): Promise<void> {
    res.status(405).send({
      message: 'Método PUT não implementado para consulta de usuários.',
    });
  }

  public static async delete(req: Request, res: Response): Promise<void> {
    res.status(405).send({
      message: 'Método DELETE não implementado para consulta de usuários.',
    });
  }
}
