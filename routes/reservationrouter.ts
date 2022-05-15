import * as express from 'express';
import { IUser } from '../model/User/userSchema';
import ReservationController from 'controllers/reservationcontroller';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import { IReservation } from 'model/Reservation/reservationSchema';

const app = express.Router();

app.post("/login", (req : any, res : any, next) => {
    console.log(req.body.data);
          
    ReservationController.getInstance().list()
    .then((reservations: any) => {
        res.status(StatusCodes.OK).json(reservations);
      })
      .catch((err) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({Error : err});
      });
});

app.post("/reserve", (req, res, next) => {  
    ReservationController.getInstance().reserve(req.body)
        .then((reservation : IReservation) => {
            if(reservation){
                res.status(StatusCodes.CREATED).send(ReasonPhrases.OK);
            }
            else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .json({message: "La reservacion no se logro realizar, por favor intente de nuevo"});
            }
            
        })
        .catch((err: any) => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({Error : err});
        });
});

export { app as userrouter }