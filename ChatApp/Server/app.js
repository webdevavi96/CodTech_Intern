import express from "express";

const app = express();

import userRouter from "./src/routes/auth.routes.js";

app.use("/api/auth", userRouter);

export { app };
