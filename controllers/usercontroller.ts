import { IUser, User } from 'model/users';
import path = require('path');
import { user_data } from '../repositories/data_user';

export default class UserController {

    private static instance: UserController;
    private user_repo: user_data;
    public DEFAULT_PASSWORD = "cinepolis_pass";

    private constructor() {
        this.user_repo = new user_data();
    }

    public static getInstance(): UserController {
        if (!this.instance) {
            this.instance = new UserController();
        }
        return this.instance;
    }

    public async login(data : any) {
        return this.user_repo.login(data).then((user : IUser) => {
          if(user){
            return user;
          }
          return null;
        }).catch((err : any)=>{});
    }

    public async register(data : any): Promise<any> {
        return this.user_repo.register(data);
    }

    public async list(): Promise<any> {
      return this.user_repo.list();
    }

    public async findUser(email : any): Promise<any> {
      return this.user_repo.find(email);
  }

  public async delete(data : any): Promise<any> {  
    return this.user_repo.delete(data);
  }

  public async add(data : any): Promise<any> {  
    return this.user_repo.add(data);
  }

  public async update(user_id : any, data : any): Promise<any> {  
    return this.user_repo.update(user_id, data);
  }
    
}
