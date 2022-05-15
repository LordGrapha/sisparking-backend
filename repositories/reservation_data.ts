import { reservation } from "model/Reservation/reservationSchema";

export class reservation_data {

    public constructor() {   
    }

    public list() {
      return reservation.find({});
    }

    public async book_reservation(info: any) {
      console.log("updating user. Info:");
      console.log(info);
      
      //Schema.findByIdAndUpdate(_id, { field: 'new data' }
      return reservation.updateOne(
        { _id : info.reservationid },
        { taken: true }).exec();
    }

}