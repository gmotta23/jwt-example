import { Router } from "express";
import AuthController from "../controllers/Auth";
import AuthMiddleware from "../middleware/Auth";

const AuthRouter = Router();

AuthRouter.post("/register", AuthController.register);
AuthRouter.post("/login", AuthController.login);
AuthRouter.post(
  "/refresh_access_token",
  AuthMiddleware.hasValidAccessToken,
  AuthController.refreshAccessToken
);

export default AuthRouter;
