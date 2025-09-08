import { Request, Response } from 'express';

import CreateUserLoginAppService from '../../services/create.user.login.app.service';
import { LoginAppRequest } from '../../validation/login.app.validation';

export default class CreateLoginAppController {
  public static async get(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static async post(req: Request, res: Response) {
    try {
      const { Nome, Senha, FotoUsuario }: LoginAppRequest = (req as any).validatedBody || req.body;
      const _createUserLoginAppService = new CreateUserLoginAppService();

      const result = await _createUserLoginAppService.execute({
        Nome,
        Senha,
        FotoUsuario: FotoUsuario ? Buffer.from(FotoUsuario, 'base64') : undefined,
      });

      // Preparar resposta (remover senha e converter FotoUsuario para base64)
      const response = {
        CodLoginApp: result.CodLoginApp,
        Nome: result.Nome,
        Ativo: result.Ativo,
        CodUsuario: result.CodUsuario,
        FotoUsuario: result.FotoUsuario
          ? result.FotoUsuario instanceof Buffer
            ? result.FotoUsuario.toString('base64')
            : result.FotoUsuario
          : null,
        // Senha deliberadamente omitida por segurança
      };

      res.status(201).send({
        message: 'Usuário criado com sucesso',
        user: response,
      });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  public static put(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static delete(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }
}
