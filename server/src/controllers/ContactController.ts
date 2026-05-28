import { Request, Response } from 'express';
import { ContactModel } from '../models/Contact';

export const createContact = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

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