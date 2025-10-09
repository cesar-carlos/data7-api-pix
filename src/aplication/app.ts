import dotenv from 'dotenv';
import AppApi from './app.api';
import AppLinstens from './app.linstens';
import ConnectionSqlServerMssql from '../infra/connection.sql.server.mssql';
import AppDependencys from './app.dependencys';
import AppFirebase from './app.firebase';

export default class App {
  private readonly port: number = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    dotenv.config();
    AppFirebase.load();
    AppDependencys.load();
    App.registerClose();
  }

  private static registerClose() {
    const connectionInstance = ConnectionSqlServerMssql.getInstance();
    process.on('SIGINT', async () => {
      await connectionInstance.closePool();
      process.exit();
    });

    process.on('SIGTERM', async () => {
      await connectionInstance.closePool();
      process.exit();
    });
  }

  public async execute() {
    const appApi = AppApi.getInstance();
    new AppLinstens(appApi.getIO()).execute();
  }
}
