import User from '../models/userModel.js';


class UserService{

  static async createUser (userData) {
    return await User.create(userData);
  };

  static async findUserByEmail(email) {
    const result = await User.findOne({
      where : {
        el_pastas : email
      }
    })
    return result;
  };

  static async findUserByID (userID) {

    const result = await User.findOne({
      where : {
        id : userID
      }
    })
    return result;
  };

}

export default UserService;