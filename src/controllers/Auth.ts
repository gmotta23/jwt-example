require("dotenv").config();
import { Request, Response } from "express";
import { User } from "../db/postgres";
import AuthUseCases from "../use-cases/Auth";

const AuthController = {
  register: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const newUser: User = { username, password };

    const success = AuthUseCases.createUser(newUser);

    if (!success) {
      return res.json({
        message: "Something wrong happened.",
      });
    }

    const { access_token, refresh_token } =
      AuthUseCases.generateAccessAndRefreshTokens(username);

    res.json({
      access_token,
      refresh_token,
    });
  },
  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = AuthUseCases.getUserByUsername(username);

    if (!user) {
      return res.json({
        message: "User not found.",
      });
    }

    const passwordIsValid = AuthUseCases.passwordIsValid(
      password,
      user.password
    );

    if (!passwordIsValid) {
      return res.json({
        message: "User or password invalid.",
      });
    }

    const { access_token, refresh_token } =
      AuthUseCases.generateAccessAndRefreshTokens(username);

    res.json({
      access_token,
      refresh_token,
    });
  },
  refreshAccessToken: async (req: Request, res: Response) => {
    // receives access token => gets username/userId
    // check if on redis there is a refresh token
    // if true create new access token and return
    // if false return nothing
  },
};

export default AuthController;
