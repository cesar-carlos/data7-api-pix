import path from 'path';

const cert_client = path.resolve(__dirname, '..', 'certificates', 'cert_gerencianet_client.p12');

export = {
  client_id: '',
  client_secret: '',
  cert_api: null,
  pix_cert: cert_client,
  client_key: null,
  chave_pix: process.env.CHAVE_PIX,
  sandbox: false,
  partner_token: undefined,
};
