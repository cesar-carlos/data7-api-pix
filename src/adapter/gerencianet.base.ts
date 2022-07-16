import Gerencianet from 'gn-api-sdk-typescript';
import GnSdk from 'gn-api-sdk-typescript/dist/src/gn-sdk';
import ContractCredentialPIX from '../contracts/credential.pix.contract';

export default abstract class GerencianetBase {
  protected gerencianet: GnSdk;

  constructor(config: ContractCredentialPIX) {
    this.gerencianet = Gerencianet(config);
  }
}