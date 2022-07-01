import express from 'express';
import cors from 'cors';

import ApiRoute from '../route/api.router';

export default class Api {
  private app = express();
  private publicPath = '../../public';

  constructor(private readonly port: number = 3000) {
    this.initialize();
  }

  private async initialize() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(this.publicPath));
    this.app.use(cors());
    this.app.use(ApiRoute.router);
  }

  public execute() {
    this.app.listen(this.port, () => {
      console.log('server started http://localhost:' + this.port);
    });
  }
}
