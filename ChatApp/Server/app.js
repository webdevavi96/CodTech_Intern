import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

import userRouter from './src/routes/auth.routes.js';
import cookieParser from 'cookie-parser';

app.use('/api/auth', userRouter);

export { app };
