import { Router, Request, Response } from "express";
import AuthController from "../controllers/Auth";

const IndexRouter = Router();

IndexRouter.post("/login", AuthController.login);

export default IndexRouter;
