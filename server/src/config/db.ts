import mongoose from 'mongoose';

const dbURI = "mongodb+srv://kvamsinellore_db_user:dU67HcXxp9biv7sK@cluster0.tlp4j9e.mongodb.net/?appName=Cluster0"

mongoose.connect(dbURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

