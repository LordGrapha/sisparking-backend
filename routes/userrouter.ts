import * as express from 'express';
import { IUser, User } from 'model/users';
import UserController from '../controllers/usercontroller';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';

const app = express.Router();

app.post("/login", (req : any, res : any, next) => {         
    UserController.getInstance().login(req.body)
    .then((user : IUser) => {
        res.status(StatusCodes.OK).json({data : user});
      })
      .catch((err) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({Error : err});
      });
});

app.post("/signUp", (req, res, next) => {  
    UserController.getInstance().register(req.body)
        .then((data: any) => {       
            //data.rows brings the dataset array with all objects inside.
            res.status(StatusCodes.CREATED).send(ReasonPhrases.OK);
        })
        .catch((err: any) => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({Error : err});
        });
});

app.get("/list", (req, res, next) => {   
    UserController.getInstance().list()
        .then((data) => {       
            //data.rows brings the dataset array with all objects inside.   
            res.json(data.rows);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

app.get("/:email", (req, res, next) => {              
  UserController.getInstance().findUser(req.params.email)
      .then((data) => {       
          //data.rows brings the dataset array with all objects inside.   
          res.json(data.rows[0]);
      })
      .catch((err) => {
          res.json(err)
          return "";
      });
});

app.put("/delete", (req, res, next) => {          
  UserController.getInstance().delete(req.body)
      .then((data) => {       
          //data.rows brings the dataset array with all objects inside.   
          res.json(data.rows);
      })
      .catch((err) => {
          res.json(err)
          return "";
      });
});

app.put("/add", (req, res, next) => {          
  UserController.getInstance().add(req.body)
      .then((data) => {       
          //data.rows brings the dataset array with all objects inside.   
          res.json(data.rows);
      })
      .catch((err) => {
          res.json(err)
          return "";
      });
});

app.put("/update/:user_id", (req, res, next) => {          
  UserController.getInstance().update(req.params.user_id, req.body)
      .then((data) => {       
          //data.rows brings the dataset array with all objects inside.   
          res.json(data.rows);
      })
      .catch((err) => {
          res.json(err)
          return "";
      });
});

export { app as userrouter }