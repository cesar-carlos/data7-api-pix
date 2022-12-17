import dotenv from 'dotenv';

import GerencianetPixDetailAdapter from '../../../src/adapter/gerencianet.pix.detail.adapter';

describe('criar cobrança', () => {
  dotenv.config();

  const pixDetail = new GerencianetPixDetailAdapter();

  it('deve criar um pix ', async () => {
    const result = await pixDetail.execute('5fa72e42b4a14c71a18dbd863733f358');
    console.log(result);
  });
});

export default {};
