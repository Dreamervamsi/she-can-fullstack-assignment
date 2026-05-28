import { createContact, getContacts } from '../controllers/ContactController';
import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middlewares/authMiddleware';

export const contactRouter = Router();

contactRouter.post('/', createContact);
contactRouter.get('/', requireAuth, requireAdmin, getContacts);
