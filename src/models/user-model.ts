import mongoose, { Schema, Document } from 'mongoose';

export interface IUserSchema extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const UserSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

export const User = mongoose.model<IUserSchema>('User', UserSchema);
