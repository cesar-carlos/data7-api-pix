import fs, { readFile } from 'fs';
import Cobranca from './model/cobranca';

export default class WatchPatch {
  constructor(readonly patch: string) {}

  public watch(): Cobranca[] | void {
    fs.watch(this.patch, (eventType, filename) => {
      if (!this.patch || !filename.endsWith('.json')) return undefined;

      try {
        const data = this.readFile(filename);
        const jsonArray = this.convertToJson(data)['Data'];

        const cobrancas: Cobranca[] = [];
        jsonArray.forEach((json: any) => {
          cobrancas.push(Cobranca.fromJson(json));
        });

        return cobrancas;
      } catch (error) {
        //todo: imprement log error
      }
    });
  }

  private readFile(filename: string): string {
    const fullPath = `${this.patch}/${filename}`;
    const data = fs.readFileSync(fullPath, 'utf8');
    return data;
  }

  private convertToJson(data: string): any {
    return JSON.parse(data);
  }
}
