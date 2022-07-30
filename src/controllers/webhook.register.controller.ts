import { Request, Response } from 'express';

import cpf from '../helper/cpf.helper';
import cnpj from '../helper/cnpj.helper';

import WebhookGnRegisterService from '../services/webhook.gn.register.service';
import WebhookListGnServices from '../services/webhook.list.gn.services';
import WebhookRegisterService from '../services/webhook.register.service';
import FirebaseWebhookRegisterRepository from '../repository/firebase.webhook.register.repository';

export default class WebhookRegisterController {
  constructor() {}

  public static async get(req: Request, res: Response) {
    try {
      const _webhookListServices = new WebhookListGnServices();
      const result = await _webhookListServices.execute();
      res.status(200).send(result);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  public static async post(req: Request, res: Response) {
    const { cnpj_cpf, chave, url } = req.body;

    if (!chave || !url || !cnpj_cpf) {
      res.status(400).send({ message: 'cnpj_cpf, chave e url são obrigatórios' });
      return;
    }

    if (!cpf(cnpj_cpf) && !cnpj(cnpj_cpf)) {
      res.status(400).send({ message: 'cnpj_cpf inválido' });
      return;
    }

    const urlObj = new URL(url);
    if (!urlObj.protocol || !urlObj.host) {
      res.status(400).send({ message: 'url inválida' });
      return;
    }

    try {
      const _webhookRegisterService = new WebhookGnRegisterService();
      const result = await _webhookRegisterService.execute(chave, urlObj);

      if (result.process.status === 'success') {
        const repo = new FirebaseWebhookRegisterRepository();
        const _webhookRegisterService = new WebhookRegisterService(repo);
        await _webhookRegisterService.execute({
          cnpj_cpf: cnpj_cpf,
          chave: chave,
          webhookUrl: url,
          criacao: new Date(),
        });
      }

      res.status(201).send(result);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  public static put(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static delete(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }
}
