import { v4 as uuidv4 } from 'uuid';
import UserUUID from '../models/uuidModel.js';
import UserService from './userService.js';


class UuidService {
  static async createUserUUIDbyID (id){

      let potencialUUID = uuidv4();
      let b=0;
      while (await this.getUserByUUID(potencialUUID) != null){
        potencialUUID = uuidv4();
      }
      try{
          const userUUID = await UserUUID.create({
          vartotojo_ID : id['vartotojo_ID'],
          UUID: potencialUUID
          });
          return userUUID;
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
      return null;
  };

  static async getUserByUUID(uuidvar){
      try{
          const result = await UserUUID.findOne({
              where : {
                UUID : uuidvar
              }
            });

          if(result == null){
              return null;
          }
          return await UserService.findUserByID(result.vartotojo_ID);
      } catch(error){
          return null;
      }
      return null;
      
  };

  static async getUUID_FromUserID (id){

      const result = await UserUUID.findOne({
        where : {
          vartotojo_ID : id
        }
      })
      if(result == null){
        return null;
      }
    
      return result.UUID;
  };
}

export default UuidService;