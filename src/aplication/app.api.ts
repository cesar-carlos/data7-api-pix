import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';

import { Server as SocketIOServer, Socket } from 'socket.io';
import http from 'http';

import ApiRoute from '../route/api.router';
import AppSocket from './app.socket.config';

export default class AppApi {
  private app: express.Application;
  private httpServer: http.Server;
  private io: SocketIOServer;

  constructor(private readonly port: number = 3000) {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.io = new SocketIOServer(this.httpServer, {
      cors: { origin: '*', methods: ['GET', 'POST'] },
    });

    this.initialize();
  }

  private async initialize() {
    this.app.use(cors());
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(__dirname, '..', '..', 'www')));
    this.app.use(ApiRoute.router);
    new AppSocket(this.io);
  }

  public execute() {
    this.httpServer.listen(this.port, () => {
      console.log(`server started http://localhost:${this.port}`);
    });
  }
}
