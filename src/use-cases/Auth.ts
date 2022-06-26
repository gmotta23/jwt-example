require("dotenv").config();
import { User } from "../db/postgres";
import { UsersDBFunctions } from "../db/postgres/functions";
import { JWTService } from "../services/Auth";

const AuthUseCases = {
  createUser: (user: User) => {
    // ideally hashing should be used here
    return UsersDBFunctions.create(user);
  },
  getUserByUsername: (username: string) => {
    return UsersDBFunctions.getByUsername(username);
  },
  passwordIsValid: (input_password: string, db_password: string) => {
    // ideally hashing should be used here
    return input_password === db_password;
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
  saveRefreshTokenOnRedis: (refresh_token: string) => {},
};

export default AuthUseCases;
