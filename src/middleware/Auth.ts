import { Request, Response, NextFunction } from "express";
import { JWTService } from "../services/jwt";

const AuthMiddleware = {
  hasValidAccessToken: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers.authorization;

    if (token) {
      const formattedToken: string = token.replace("Bearer ", "");

      const { payload } = JWTService.getTokenPayload(
        formattedToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      req.user = payload;

      next();
    }

    res.status(403).json({
      message: "You need to be authenticated for this.",
    });
  },
};

export default AuthMiddleware;
