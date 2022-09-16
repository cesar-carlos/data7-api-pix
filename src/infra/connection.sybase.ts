const Sybase = require('sybase');
import { IResult, ISqlType } from 'mssql';
export class ConnectionSybase {
  private conn;

  constructor(private config: any) {
    this.conn = new Sybase(
      this.config.host,
      this.config.port,
      this.config.dbname,
      this.config.username,
      this.config.password,
    );
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

      const Pool = this.pool;
      function DisconnectAndReject(ret: any) {
        Pool.disconnect();
        reject(ret);
      }
      Pool.connect(function (err: any) {
        if (err) return DisconnectAndReject(err);
        Pool.query(sql, function (err: any, data: any) {
          if (err) return DisconnectAndReject(err);
          Pool.disconnect();
          return resolve(data);
        });
      });
    });
  }

  public clearParams(): Request {
    this.inputs = [];
    return this;
  }
}
