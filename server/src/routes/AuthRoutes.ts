import { Router } from 'express';
import { loginUser, registerUser, getProfile } from '../controllers/AuthController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

export const authRouter = Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/profile', requireAuth, getProfile);
