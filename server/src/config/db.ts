import mongoose from 'mongoose';

const dbURI = process.env.DBURI || 'mongodb://localhost:27017/she-can-fullstack-assignment';

mongoose.connect(dbURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

