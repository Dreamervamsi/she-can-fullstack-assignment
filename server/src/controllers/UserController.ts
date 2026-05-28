import { Request, Response } from 'express';
<<<<<<< HEAD
import { UserModel } from '../models/User.js';
=======
import { UserModel } from '../models/User';
>>>>>>> c5060776235a727c2917c6b28fbe05b13fd6324e

export const getUsers = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await UserModel.find({}, { passwordHash: 0 }).sort({ createdAt: -1 });
    return res.status(200).json({ users });
  } catch (error: any) {
    console.error('Error fetching users:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
