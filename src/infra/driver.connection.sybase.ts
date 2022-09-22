import { ISqlType } from 'mssql';

const Sybase = require('sybase');

export class DriverConnectionSybase {
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

  public connect(): Promise<DriverConnectionSybase> {
    return new Promise((resolve, reject) => {
      this.conn.connect((err: any) => {
        if (err) return reject(err);
        return resolve(this);
      });
    });
  }

  public close(): void {
    this.conn.isConnected() && this.conn.disconnect();
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
        if (input.type.toString().includes('Date')) {
          const value = `'${input.value.toISOString().slice(0, 19).replace('T', ' ')}'`;
          return acc.replace(`@${input.name}`, value);
        } else {
          const value = typeof input.value === 'string' ? (input.value = `'${input.value}'`) : input.value;
          return acc.replace(`@${input.name}`, value);
        }
      }, command);

      // if (sql.includes('@')) {
      //   reject(new Error('Missing input value ' + sql));
      // }

      ///console.log(sql);
      const Pool = this.pool;
      try {
        const RetData = await new Promise((resolve, reject) => {
          Pool.query(sql, function (err: any, data: any) {
            if (err) return reject(err);
            return resolve(data);
          });
        });
        resolve(RetData);
      } catch (err) {
        reject(err);
      }
    });
  }
}
