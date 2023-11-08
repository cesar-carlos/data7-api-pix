import dotenv from 'dotenv';
import AppApi from './app.api';
import AppLinstens from './app.linstens';
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
  }

  public async execute() {
    new AppLinstens().execute();
    new AppApi(this.port).execute();
  }
}
