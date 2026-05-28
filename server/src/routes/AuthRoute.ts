import { Router } from 'express';
import { loginUser, registerUser, getProfile } from '../controllers/AuthController';
import { requireAuth } from '../middlewares/authMiddleware';

export const authRouter = Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/profile', requireAuth, getProfile);
