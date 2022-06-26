import jwt from "jsonwebtoken";

export interface UserJwtPayload extends jwt.JwtPayload {
  username: string;
}

export class JWTService {
  public static generateToken(
    payload: string | Object,
    secret: string,
    expiration_time?: string
  ) {
    let jwt_options = expiration_time
      ? { expiresIn: expiration_time as string }
      : undefined;

    return jwt.sign({ payload }, secret, jwt_options);
  }
  public static getTokenPayload(token: string, secret: string) {
    return <UserJwtPayload>jwt.verify(token, secret);
  }
}
