import mongoose from 'mongoose';
import { ensureAdminUser } from './seedAdmin.js';

const dbURI =
  process.env.DBURI ||
  'mongodb://localhost:27017/she-can-fullstack-assignment';

mongoose
  .connect(dbURI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await ensureAdminUser();
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));

