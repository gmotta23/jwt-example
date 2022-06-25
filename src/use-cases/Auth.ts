require("dotenv").config();
import { JWTService } from "../services/Auth";

const AuthUseCases = {
  generateAccessToken: (payload: any) => {
    return JWTService.generateToken(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXPIRATION
    );
  },
  generateRefreshToken: (payload: any) => {
    return JWTService.generateToken(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_EXPIRATION
    );
  },
  generateAccessAndRefreshTokens: (payload: any) => {
    return {
      access_token: AuthUseCases.generateAccessToken(payload),
      refresh_token: AuthUseCases.generateAccessToken(payload),
    };
  },
  saveRefreshTokenOnRedis: (refresh_token: string) => {},
};

export default AuthUseCases;
