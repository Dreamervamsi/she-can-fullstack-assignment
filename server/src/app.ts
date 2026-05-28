import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { contactRouter } from './routes/ContactRoute';
import { authRouter } from './routes/AuthRoute';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);

