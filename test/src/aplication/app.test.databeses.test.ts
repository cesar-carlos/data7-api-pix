import dotenv from 'dotenv';

import AppFirebase from '../../../src/aplication/app.firebase';
import AppDependencys from '../../../src/aplication/app.dependencys';
import AppTestDatabeses from '../../../src/aplication/app.test.databeses';

describe('teste base de dados online', () => {
  dotenv.config();
  AppFirebase.load();
  AppDependencys.load();

  it('bases', async () => {
    const appTestDatabeses = new AppTestDatabeses();
    const info = await appTestDatabeses.execute();
    expect(info.process.status).toBe('success');
  });
});

export default {};
