import { Request, Response } from 'express';

export default class TimeoutController {
  public static async get(req: Request, res: Response) {
    const time = req.params.time;
    const timeout = parseInt(time);
    if (isNaN(timeout)) {
      return res.status(400).send('Invalid time');
    }

    setTimeout(() => {
      res.status(200).send({ time: new Date().toISOString() });
    }, timeout * 1000);
  }

  public static post(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static put(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static delete(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }
}
