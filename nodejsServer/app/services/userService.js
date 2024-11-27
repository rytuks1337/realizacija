import { ExtraError } from '../handlers/errorHandler.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'

class UserService{

  static async createUser (userData) {
    if(userData.lytis==='M'){
      userData.lytis = 'V';
    }
    return await User.create(userData);
  };
  static async editUser(id, data){
    var {vardas, pavarde, amzius,svoris, el_pastas, slaptazodis, lytis} = data;
    var currentUser = await User.findByPk(id);
    if(currentUser.length===0){
      throw ExtraError("User not found", 404);
    }
    if(data !== undefined){
      
      if(vardas !== undefined){
        currentUser.vardas= vardas;
      }
      if(pavarde !== undefined){
        currentUser.pavarde= pavarde;
      }
      if(amzius !== undefined){
        currentUser.amzius= amzius;
      }
      if(svoris !== undefined){
        currentUser.svoris= amzius;
      }
      if(el_pastas !== undefined){
        currentUser.el_pastas= el_pastas;
      }
      if(slaptazodis !== undefined){
        const hashedPassword = await bcrypt.hash(slaptazodis, 10);
        currentUser.slaptazodis= hashedPassword;
      }
      if(lytis !== undefined){
        if(lytis === 'M'){
          lytis = 'V';
        }
        currentUser.lytis= lytis;
      }
    }
    currentUser.save();
  }

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