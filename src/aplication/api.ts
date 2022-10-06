import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import ApiRoute from '../route/api.router';
import path from 'path';

export default class Api {
  private app = express();

  constructor(private readonly port: number = 3000) {
    this.initialize();
  }

  private async initialize() {
    this.app.use(cors());
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    //this.app.use(express.static(path.join(__dirname, '..', '..', 'www')));
    this.app.use(ApiRoute.router);
  }

  public execute() {
    this.app.listen(this.port, () => {
      console.log(`server started http://localhost:${this.port}`);
    });
  }
}
