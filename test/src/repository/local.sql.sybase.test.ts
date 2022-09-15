import { ConnectionSybase } from '../../../src/infra/connection.sybase';
import confg from '../../../src/assets/config.sybase';

describe('CRUD (Integracao.CobrancaDigitalChave)', () => {
  it('', async () => {
    const conn = new ConnectionSybase(confg);
    const result = await conn.request().query('SELECT * FROM Demo');
    console.log(result);
  });
});

export default {};
