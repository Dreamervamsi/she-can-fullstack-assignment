import { createContact, getContacts, deleteContact } from '../controllers/ContactController.js';
import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middlewares/authMiddleware.js';

export const contactRouter = Router();

contactRouter.post('/api/contact', createContact);
contactRouter.get('/api/contact', requireAuth, requireAdmin, getContacts);
contactRouter.delete('/api/contact/:id', requireAuth, requireAdmin, deleteContact);
