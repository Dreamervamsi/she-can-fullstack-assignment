import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { contactRouter } from './routes/ContactRoute.js';
<<<<<<< HEAD
import { authRouter } from './routes/AuthRoutes.js';
=======
import { authRouter } from './routes/AuthRoute.js';
>>>>>>> c5060776235a727c2917c6b28fbe05b13fd6324e
import { userRouter } from './routes/UserRoute.js';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

<<<<<<< HEAD

=======
>>>>>>> c5060776235a727c2917c6b28fbe05b13fd6324e
app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

