import { Router } from 'express';
import { getUsers } from '../controllers/UserController';
import { requireAuth, requireAdmin } from '../middlewares/authMiddleware';

export const userRouter = Router();

userRouter.get('/', requireAuth, requireAdmin, getUsers);
