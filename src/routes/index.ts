import { Router } from "express";
import AuthController from "../controllers/Auth";

const IndexRouter = Router();

IndexRouter.post("/register", AuthController.register);
IndexRouter.post("/login", AuthController.login);

export default IndexRouter;
