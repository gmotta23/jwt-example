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
      AuthUseCases.generateAccessAndRefreshTokens({ username });

    AuthUseCases.saveRefreshTokenOnRedis(username, refresh_token);

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

    const passwordIsValid = await AuthUseCases.passwordIsValid(
      password,
      user.password
    );

    if (!passwordIsValid) {
      return res.json({
        message: "User or password invalid.",
      });
    }

    const { access_token, refresh_token } =
      AuthUseCases.generateAccessAndRefreshTokens({ username });

    AuthUseCases.saveRefreshTokenOnRedis(username, refresh_token);

    res.json({
      access_token,
      refresh_token,
    });
  },
  refreshAccessToken: async (req: Request, res: Response) => {
    // this controller should be propected by access_token
    const { refresh_token: input_refresh_token } = req.body;

    const {
      payload: { username },
    } = AuthUseCases.getRefreshTokenPayload(input_refresh_token);

    if (!username) {
      return res.json({});
    }

    const refresh_token_on_redis =
      AuthUseCases.getRefreshTokenOnRedis(username);

    if (!refresh_token_on_redis) {
      return res.json({});
    }

    const { access_token, refresh_token } =
      AuthUseCases.generateAccessAndRefreshTokens({ username });

    res.json({ access_token, refresh_token });
  },
};

export default AuthController;
