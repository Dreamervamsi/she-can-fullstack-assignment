import { Router } from 'express';
<<<<<<< HEAD
import { getUsers } from '../controllers/UserController.js';
import { requireAuth, requireAdmin } from '../middlewares/authMiddleware.js';
=======
import { getUsers } from '../controllers/UserController';
import { requireAuth, requireAdmin } from '../middlewares/authMiddleware';
>>>>>>> c5060776235a727c2917c6b28fbe05b13fd6324e

export const userRouter = Router();

userRouter.get('/', requireAuth, requireAdmin, getUsers);
