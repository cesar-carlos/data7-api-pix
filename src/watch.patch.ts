import fs, { readFile } from 'fs';

export default class WatchPatch {
  constructor(readonly patch: string) {}

  public watch(): void {
    fs.watch(this.patch, (eventType, filename) => {
      try {
        if (filename && filename.endsWith('.json')) this.readFile(filename);
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
