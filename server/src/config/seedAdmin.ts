import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@shecan.foundation';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin123!';

export const ensureAdminUser = async () => {
  try {
    const existingAdmin = await UserModel.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      return;
    }

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

    await UserModel.create({
      name: 'Admin',
      email: ADMIN_EMAIL,
      passwordHash,
      role: 'admin',
    });

    console.log(`Admin user created with email ${ADMIN_EMAIL}`);
  } catch (error: any) {
    console.error('Error creating admin user:', error.message || error);
  }
};
