import { createContact, getContacts, deleteContact } from '../controllers/ContactController.js';
import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middlewares/authMiddleware.js';

export const contactRouter = Router();

contactRouter.post('/create', createContact);
contactRouter.get('/', requireAuth, requireAdmin, getContacts);
contactRouter.delete('/:id', requireAuth, requireAdmin, deleteContact);
