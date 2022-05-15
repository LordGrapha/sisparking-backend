import { IUser } from '../model/User/userSchema'
import path = require('path');
import { user_data } from '../repositories/data_user';

export default class UserController {

    private static instance: UserController;
    private user_repo: user_data;

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
        return this.user_repo.login(data);
    }

    public async register(data : any): Promise<any> {
        return this.user_repo.register(data);
    }

    //_user.license_plates.push(info.license_plate);
    public async add_license_plate(data : any) {
      return this.user_repo.add_license_plate(data);
    }

}
