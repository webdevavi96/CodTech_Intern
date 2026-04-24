import express from "express";
import cors from "cors";
import Server from "socket.io";
import { creatServer } from "http";
import cookieParser from "cookie-parser";
import userRouts from "./core/User/user.routes.js";
import docRouts from "./core/Documents/document.routes.js";

const app = express();
const server = creatServer(app);

const io = new Server(server, {
  cors: { origin: process.env.ORIGIN, methods: ["GET", "POST"] },
});

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRouts);
app.use("/api/doc", docRouts);

export { app, server };
