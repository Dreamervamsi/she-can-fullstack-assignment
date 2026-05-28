import { createContact, getContacts, deleteContact } from '../controllers/ContactController.js';
import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middlewares/authMiddleware.js';

export const contactRouter = Router();

<<<<<<< HEAD
contactRouter.post('/create', createContact);
contactRouter.get('/', requireAuth, requireAdmin, getContacts);
contactRouter.delete('/:id', requireAuth, requireAdmin, deleteContact);
=======
contactRouter.post('/api/contact', createContact);
contactRouter.get('/api/contact', requireAuth, requireAdmin, getContacts);
contactRouter.delete('/api/contact/:id', requireAuth, requireAdmin, deleteContact);
>>>>>>> c5060776235a727c2917c6b28fbe05b13fd6324e
