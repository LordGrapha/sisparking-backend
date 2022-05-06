import express from "express";
import mongoose, { ConnectOptions } from 'mongoose';
import Routes from './routes/routes';
//import * as database from "./db"
import path = require("path");
const cors = require('cors');

class App {

    public app: express.Application;
    public db: any;

    constructor() {
        //this.db = database.default;
        this.app = express();
        this.middleware();
        
        this.connectToDatabase().then(()=>{
            console.log('Connected to mongodb');
            this.routes();
        }).catch((err : any)=>{
            console.log(err);
        });
    }


    // Configure Express middleware.
    private middleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(
            cors({
              origin: [/^http:\/\/localhost/],
              credentials: true,
            })
          );
    }

    private connectToDatabase(){
        return mongoose.connect("mongodb+srv://tec:tec@cluster0.jngjz.mongodb.net/sisparking?retryWrites=true&w=majority");
    }

    private routes(): void {
        this.app.use('/api', Routes);

        this.app.use('*', (req, res) => {
            res.send("Request invalido");
        });
    }
}

export default new App().app;