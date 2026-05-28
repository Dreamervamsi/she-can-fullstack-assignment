import { createContact, getContacts, deleteContact } from '../controllers/ContactController';
import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middlewares/authMiddleware';

export const contactRouter = Router();

contactRouter.post('/', createContact);
contactRouter.get('/', requireAuth, requireAdmin, getContacts);
contactRouter.delete('/:id', requireAuth, requireAdmin, deleteContact);
