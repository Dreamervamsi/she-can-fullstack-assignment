import { Router } from 'express';
import { getUsers } from '../controllers/UserController.js';
import { requireAuth, requireAdmin } from '../middlewares/authMiddleware.js';

export const userRouter = Router();

userRouter.get('/', requireAuth, requireAdmin, getUsers);
