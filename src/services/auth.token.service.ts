import jwt from 'jsonwebtoken';

export default class AuthTokenService {
  private sicret = process.env.JWT_SECRET;

  public generateToken(payload: any) {
    if (!this.sicret) throw new Error('JWT_SECRET not defined');
    return jwt.sign(payload, this.sicret, { expiresIn: '1d' });
  }

  public decodeToken(token: string) {
    if (!this.sicret) throw new Error('JWT_SECRET not defined');
    return jwt.verify(token, this.sicret);
  }
}
