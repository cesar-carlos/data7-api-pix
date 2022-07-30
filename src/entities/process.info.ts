import { ProcessInfoStatusType } from '../type/process.info.status.type';

export default class ProcessInfo {
  toJSON(): any {
    throw new Error('Method not implemented.');
  }
  constructor(readonly process: ProcessInfoStatusType, readonly result: string, readonly info?: string) {}
}
