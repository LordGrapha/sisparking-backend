import { model, Schema } from 'mongoose';

export interface IUser  {
    email: string;
    password: string;
    deleted: boolean;
    role: string;
    createdAt: Date;
}

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    password: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: 'visitante',
        enum: ['jefatura','funcionario', 'visitante']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const User = model<IUser>('User', userSchema);