require("dotenv").config();
import express, { Request, Response } from "express";
import morgan from "morgan";

import AuthRouter from "./routes/Auth";
const app = express();

app.use(express.json());
app.use(morgan("combined"));
app.use("/", AuthRouter);

app.listen(process.env.SERVER_PORT, () =>
  console.log("Listening on PORT " + process.env.SERVER_PORT)
);

export default app;
