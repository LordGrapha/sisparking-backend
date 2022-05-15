import { model, Schema } from 'mongoose';

export interface IReservation  {
    duration: number;
    zone: string;
    deleted: boolean;
    space: string;
    license_plate: string;
    createdAt: Date;
}

const reservationSchema = new Schema({
    duration: {
        type: Number
    },
    zone: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    space: {
        type: String
    },
    license_plate: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const reservation = model<IReservation>('Reservation', reservationSchema);