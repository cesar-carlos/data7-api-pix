import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

import GerencianetCreatePixAdapter from '../../../src/adapter/gerencianet.create.pix.adapter';

describe('criar cobrança', () => {
  dotenv.config();

  const rawJson = fs.readFileSync(path.resolve(__dirname, '../../../mocks/request.create.pix.dto.mock.json'), 'utf8');
  const request = JSON.parse(rawJson);
  const api = new GerencianetCreatePixAdapter();

  it('deve criar um pix ', async () => {
    const result = await api.execute(request);
    console.log(result);
  });
});

export default {};
