import fs from 'fs';
import path from 'path';
import util from 'util';

import { STATUS } from '../type/status';

import ProcessInfo from '../entities/process.info';
import AppAbortCharge from './app.abort.charge';
import AppTestDatabeses from './app.test.databeses';
import AppCobrancaPix from './app.cobranca.pix';
import AppCobrancaPixValidar from './app.cobranca.pix.validar';

export default class AppCobrancaAutoBuild {
  constructor() {}

  async execute(patth: string): Promise<ProcessInfo> {
    try {
      const readDir = util.promisify(fs.readdir);
      const files = await readDir(patth);

      const appChargeValidDatabese = new AppTestDatabeses();
      const infoDatabese = await appChargeValidDatabese.execute();
      if (infoDatabese.process.status === 'error') return infoDatabese;

      for (const file of files) {
        if (file?.includes('.log')) {
          const fullPath = path.resolve(patth, file);
          const fileData = fs.readFileSync(fullPath, 'utf8');

          fs.unlinkSync(fullPath);
          const request = JSON.parse(fileData.toString());

          //METHOD DELETE
          if (request?.Method === 'DELETE') {
            new AppAbortCharge({
              sysId: request.SysId,
              requerente: 'CS',
            }).execute();

            return new ProcessInfo({ status: 'success' }, 'INFO-REQUEST', 'DELETE');
          }

          //METHOD POST
          if (request?.Method === 'POST') {
            const data = request?.Body.Data;

            const infoValid = new AppCobrancaPixValidar().execute(data);
            if (infoValid.process.status === 'error') return infoValid;

            const appCobrancaPix = new AppCobrancaPix();
            const infoCobranca = await appCobrancaPix.execute(data);

            if (infoCobranca.process.status === 'error') {
              throw new Error(infoCobranca.result);
            }
          }
        }
      }

      return new ProcessInfo({ status: 'success' }, STATUS.MENSAGEM_BLOQUEIO, '');
    } catch (err: any) {
      return new ProcessInfo({ status: 'error' }, err.message, '');
    }
  }
}
