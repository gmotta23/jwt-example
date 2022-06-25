import jwt from "jsonwebtoken";

export class JWTService {
  public static generateToken(
    payload: string,
    secret: string,
    expiration_time?: string
  ) {
    let jwt_options = expiration_time
      ? { expiresIn: expiration_time as string }
      : undefined;

    return jwt.sign({ payload }, secret, jwt_options);
  }
}
