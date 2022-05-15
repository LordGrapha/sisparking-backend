import { user } from "../model/User/userSchema";

export class user_data {

    public constructor() {   
    }

    public login(info: any) {
      return user.findOne({email: info.email, password: info.password});
    }

    public register(info: any) {
        const _user = new user({
          username: info.username,
          email: info.email,
          license_plates: [info.license_plate],
          permissions: [info.permissions]
        });
        return _user.save();
    }

    public async add_license_plate(info: any) {
      console.log("updating user. Info:");
      console.log(info);
      
      
      return user.updateOne(
        { email: info.email},
        { $push: { license_plate: info.license_plate }}).exec();

      
      //user.updateOne({email: info.email}, {license_plates: });
      //await User.updateOne({_id: user.id}, {email: token.newEmail, $pull: {tokens: {token: token.token}}});
    }

}