import path from 'path';

import { PixSicredi } from 'data7-pix';
import { ConfigApiPixType } from '../type/config.api.pix.type';
import { ContratoBaseServicoPix } from 'data7-pix/dist/types';

export default abstract class SicrediBase {
  protected sicredi: ContratoBaseServicoPix;
  protected config: ConfigApiPixType;

  constructor() {
    this.config = require(path.resolve(__dirname, '..', 'assets', 'config.sicredi.pix'));

    const props = {
      client_id: this.config.client_id,
      client_secret: this.config.client_secret,
      ca_path: undefined,
      cert_path: this.config.pix_cert,
      key_path: this.config.client_key,
      chave_pix: this.config.chave_pix,
    };

    this.sicredi = PixSicredi.config(props);
  }
}
