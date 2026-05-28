import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { contactRouter } from './routes/ContactRoute.js';
import { authRouter } from './routes/AuthRoutes.js';
import { userRouter } from './routes/UserRoute.js';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

