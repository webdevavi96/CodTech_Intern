import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

import userRouter from "./src/routes/auth.routes.js";

app.use("/api/auth", userRouter);

export { app };
