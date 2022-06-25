require("dotenv").config();
import { Request, Response } from "express";
import { JWTFactory } from "../services/Auth";

let refreshTokens = []; // This will go to Redis.

const AuthController = {
  login: async (req: Request, res: Response) => {
    try {
      const { username } = req.body;

      const access_token = JWTFactory.generateToken(
        username,
        process.env.ACCESS_TOKEN_SECRET,
        "60"
      );
      const refresh_token = JWTFactory.generateToken(
        username,
        process.env.REFRESH_TOKEN_SECRET
      );

      refreshTokens.push(refresh_token); // Implement this on db functions (Redis)

      res.json({
        access_token,
        refresh_token,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default AuthController;
