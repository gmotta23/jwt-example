import { Router } from "express";
import AuthController from "../controllers/Auth";

const IndexRouter = Router();

IndexRouter.post("/register", AuthController.register);
IndexRouter.post("/login", AuthController.login);
IndexRouter.post("/refresh_access_token", AuthController.refreshAccessToken);

export default IndexRouter;
