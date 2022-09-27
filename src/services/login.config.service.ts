import AuthTokenService from './auth.token.service';

export default class LoginConfigService {
  constructor() {}

  auth(email: string, password: string): string {
    const authToken = new AuthTokenService();

    if (email === 'admin@se7esistemas.com.br' && password === 'admin') {
      return authToken.generateToken({ email });
    } else {
      return 'unauthorized';
    }
  }
}
