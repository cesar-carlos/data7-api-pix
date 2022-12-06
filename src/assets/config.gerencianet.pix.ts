import path from 'path';

const cert_client = path.resolve(__dirname, '..', 'certificates', 'cert_gerencianet_client.p12');

export = {
  client_id: 'Client_Id_f0ffde1df9d30da300abdbd9553732c6476039cb',
  client_secret: 'Client_Secret_61d0d7cee4b9fad1182feca64224106638c08470',
  cert_api: null,
  pix_cert: cert_client,
  client_key: null,
  chave_pix: process.env.CHAVE_PIX,
  sandbox: false,
  partner_token: undefined,
};
