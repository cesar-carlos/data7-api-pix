import Gerencianet from 'gn-api-sdk-typescript';
import GnSdk from 'gn-api-sdk-typescript/dist/src/gn-sdk';
import path from 'path';

export default abstract class GerencianetBase {
  protected gerencianet: GnSdk;

  constructor() {
    const config = require(path.resolve(__dirname, '..', 'assets', 'config.pix'));
    this.gerencianet = Gerencianet(config);
  }
}
