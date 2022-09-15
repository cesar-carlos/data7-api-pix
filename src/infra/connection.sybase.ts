const Sybase = require('sybase-plus');
import { IResult, ISqlType } from 'mssql';

export class ConnectionSybase {
  private conn;

  constructor(private config: any) {
    this.conn = new Sybase(config.host, config.port, config.dbname, config.username, config.password);
  }

  public request(): Request {
    return new Request(this.conn);
  }
}

export class Request {
  private inputs: any = [];
  constructor(private pool: any) {}

  public input(name: string, type: (() => ISqlType) | ISqlType, value: any): Request {
    this.inputs.push({ name, type, value });
    return this;
  }

  public query(command: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const sql = this.inputs.reduce((acc: string, input: any) => {
        const value = typeof input.value === 'string' ? (input.value = `'${input.value}'`) : input.value;
        return acc.replace(`@${input.name}`, value);
      }, command);

      if (sql.includes('@')) {
        reject(new Error('Missing input value'));
      }

      const conec = await this.pool.connect();
      const res = this.pool.isConnected(() => {});
      //const result = await this.pool.exec(sql);
      console.log(res);
      resolve('result');
    });
  }

  public clearParams(): Request {
    this.inputs = [];
    return this;
  }
}
