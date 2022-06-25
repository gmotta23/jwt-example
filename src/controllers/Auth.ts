require("dotenv").config();
import { Request, Response } from "express";
import { JWTService } from "../services/Auth";
import AuthUseCases from "../use-cases/Auth";

let refreshTokens = []; // This will go to Redis.

const AuthController = {
  register: async (req: Request, res: Response) => {
    // receives username and password
    // adds to db
  },
  login: async (req: Request, res: Response) => {
    try {
      const { username } = req.body;

      const { access_token, refresh_token } =
        AuthUseCases.generateAccessAndRefreshTokens(username);

      refreshTokens.push(refresh_token); // Implement this on db functions (Redis)
      // refresh token expiration should be the ttl, so the refresh token is always valid?

      // there should be a request somewhere to check if there is a refresh token
      // that request should respond with a new access token

      res.json({
        access_token,
        refresh_token,
      });
    } catch (error) {
      console.log(error);
    }
  },
  refreshAccessToken: async (req: Request, res: Response) => {
    // receives access token => gets username/userId
    // check if on redis there is a refresh token
    // if true create new access token and return
    // if false return nothing
  },
};

export default AuthController;
