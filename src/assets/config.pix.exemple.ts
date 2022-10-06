import path from 'path';

const certPath = path.resolve(__dirname, '..', 'certificates', 'cert_gn.p12');
export = {
  client_id: '',
  client_secret: '',
  pix_cert: certPath,
  sandbox: false,
  partner_token: undefined,
};
