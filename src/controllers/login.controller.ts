import { Request, Response } from 'express';
import LoginConfigService from '../services/login.config.service';

export default class LoginController {
  public static async get(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static post(req: Request, res: Response) {
    const { email, password } = req.body;
    const loginConfigService = new LoginConfigService();
    const token = loginConfigService.auth(email, password);
    if (token === 'unauthorized') {
      res.status(401).send({ message: 'unauthorized' });
    }

    res.status(200).send({ token });
  }

  public static put(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static delete(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }
}
