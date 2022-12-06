import { ConfigApiPixType } from '../type/config.api.pix.type';

import Gerencianet from 'gn-api-sdk-typescript';
import GnSdk from 'gn-api-sdk-typescript/dist/src/gn-sdk';
import path from 'path';

export default abstract class GerencianetBase {
  protected gerencianet: GnSdk;
  protected config: ConfigApiPixType;

  constructor() {
    this.config = require(path.resolve(__dirname, '..', 'assets', 'config.gerencianet.pix'));
    this.gerencianet = Gerencianet(this.config);
  }
}
