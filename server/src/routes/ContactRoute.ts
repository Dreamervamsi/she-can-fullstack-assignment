import {createContact} from '../controllers/ContactController';
import Router from 'express';

export const contactRouter = Router();

contactRouter.post('/api/contact', createContact);