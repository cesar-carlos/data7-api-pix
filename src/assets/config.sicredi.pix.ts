import path from 'path';

const cert_api = path.resolve(__dirname, '..', 'certificates', 'cert_sicredi.cer');
const cert_client = path.resolve(__dirname, '..', 'certificates', 'cert_sicredi_client.pem');
const key_client = path.resolve(__dirname, '..', 'certificates', 'cert_key_sicredi_client.key');

export = {
  client_id: 'MDg4OTk1NDAwMDAxNjA6MDAwMTpwTTk',
  client_secret: 'azdebEcoVGwmMWRYRlM5',
  cert_api: cert_api,
  pix_cert: cert_client,
  client_key: key_client,
  chave_pix: process.env.CHAVE_PIX,
  sandbox: false,
  partner_token: undefined,
};