require("dotenv").config();
import { User } from "../db/postgres";
import { UsersDBFunctions } from "../db/postgres/functions";
import { RedisFunctions } from "../db/redis/functions";
import { BCryptService } from "../services/bcrypt";
import { JWTService } from "../services/jwt";

const AuthUseCases = {
  createUser: async (user: User) => {
    user.password = await BCryptService.hash(user.password);
    return UsersDBFunctions.create(user);
  },
  getUserByUsername: (username: string) => {
    return UsersDBFunctions.getByUsername(username);
  },
  passwordIsValid: async (input_password: string, db_password: string) => {
    return await BCryptService.compare(input_password, db_password);
  },
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
      refresh_token: AuthUseCases.generateRefreshToken(payload),
    };
  },
  getRefreshTokenPayload: (token: string) => {
    try {
      return JWTService.getTokenPayload(
        token,
        process.env.REFRESH_TOKEN_SECRET
      );
    } catch (error) {
      return { payload: { username: undefined } };
    }
  },
  saveRefreshTokenOnRedis: async (username: string, refresh_token: string) => {
    return await RedisFunctions.set(
      username,
      refresh_token,
      Number(process.env.REFRESH_TOKEN_TTL)
    );
  },
  getRefreshTokenOnRedis: async (username: string) => {
    return await RedisFunctions.get(username);
  },
};

export default AuthUseCases;
