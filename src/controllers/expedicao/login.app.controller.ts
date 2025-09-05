import { Request, Response } from 'express';

import { LoginRequest } from '../../validation/login.validation';
import LoginAppService from '../../services/login.app.service';

export default class LoginAppController {
  public static async get(req: Request, res: Response): Promise<void> {
    try {
      const { nome } = req.query;

      if (!nome || typeof nome !== 'string') {
        res.status(400).send({
          message: 'Parâmetro "nome" é obrigatório',
        });
        return;
      }

      const loginAppService = new LoginAppService();
      const user = await loginAppService.FindByName(nome);

      if (!user) {
        res.status(404).send({ message: 'Usuário não encontrado' });
        return;
      }

      const { Senha: _, ...userWithoutPassword } = user;
      res.status(200).send(userWithoutPassword);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
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
