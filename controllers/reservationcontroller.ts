import { IReservation } from 'model/Reservation/reservationSchema';
import path = require('path');
import { reservation_data } from 'repositories/reservation_data';

export default class ReservationController {

    private static instance: ReservationController;
    private reservation_repo: reservation_data;

    private constructor() {
        this.reservation_repo = new reservation_data();
    }

    public static getInstance(): ReservationController {
        if (!this.instance) {
            this.instance = new ReservationController();
        }
        return this.instance;
    }

    public async list() {
        return this.reservation_repo.list();
    }

    public async reserve(data : any): Promise<any> {
        this.reservation_repo.book_reservation(data)
        .then((reservation : any) => {
          if(reservation){
            return reservation;
          }
          return null;
        }).catch((err) => {
          console.log(err);
          return null;
        });
    }

}
