import { ProcessInfoStatusType } from '../type/process.info.status.type';

export default class ProcessInfo {
  constructor(readonly process: ProcessInfoStatusType, readonly result: string, readonly info?: string) {}

  //create method toJSON()
  toJSON() {
    return {
      process: this.process,
      result: this.result,
      info: this.info,
    };
  }

  //create method fromJSON()
  static fromJSON(json: any): ProcessInfo {
    return new ProcessInfo(json.process, json.result, json.info);
  }
}
