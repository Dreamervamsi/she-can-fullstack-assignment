import mongoose, { Schema } from 'mongoose';

interface Contact{
    name:string,
    email:string,
    message:string,
    createdAt:Date
}

const schema = new Schema<Contact>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const ContactModel = mongoose.model<Contact>('Contact', schema);

