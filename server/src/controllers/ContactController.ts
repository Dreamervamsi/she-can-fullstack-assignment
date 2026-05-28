import { Request, Response } from 'express';
<<<<<<< HEAD
import { ContactModel } from '../models/Conatact.js';
=======
import { ContactModel } from '../models/Contact.js';
>>>>>>> c5060776235a727c2917c6b28fbe05b13fd6324e

export const createContact = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
<<<<<<< HEAD
=======

>>>>>>> c5060776235a727c2917c6b28fbe05b13fd6324e
    const contact = await ContactModel.create({ name, email, message });
    return res.status(201).json(contact);
  } catch (error: any) {
    console.error('Error creating contact:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
export const getContacts = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const contacts = await ContactModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ contacts });
  } catch (error: any) {
    console.error('Error fetching contact messages:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteContact = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const contact = await ContactModel.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact message not found' });
    }

    return res.status(200).json({ message: 'Contact message deleted' });
  } catch (error: any) {
    console.error('Error deleting contact message:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};