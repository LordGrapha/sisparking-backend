import * as express from 'express';
import { IUser } from '../model/User/userSchema';
import UserController from '../controllers/usercontroller';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';

const app = express.Router();

app.post("/login", (req : any, res : any, next) => {
    console.log(req.body.data);
          
    UserController.getInstance().login(req.body.data)
    .then((user : IUser) => {
        res.status(StatusCodes.OK).json(user);
      })
      .catch((err) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({Error : err});
      });
});

app.post("/signUp", (req, res, next) => {  
    UserController.getInstance().register(req.body)
        .then((user : IUser) => {
            console.log("Register - user:");
            console.log(user);
            
            if(user){
                res.status(StatusCodes.CREATED).send(user);
            }
            else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .json({message: "El usuario no se logro crear, por favor intente de nuevo"});
            }
            
        })
        .catch((err: any) => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({Error : err});
        });
});

app.post("/add_license_plate", (req, res, next) => {  
    UserController.getInstance().add_license_plate(req.body)
        .then((result : any) => {
            console.log(result);
            
            if(result){
                res.status(StatusCodes.OK).send(ReasonPhrases.OK);
            }
            else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .json({message: "El usuario no se logro actualizar, por favor intente de nuevo"});
            }
            
        })
        .catch((err: any) => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({Error : err});
        });
}); 

export { app as userrouter }