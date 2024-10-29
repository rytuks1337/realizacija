import { v4 as uuidv4 } from 'uuid';
import  UserUUID from '../models/uuidModel.js';
import { findUserByID } from './userService.js';



const createUserUUIDbyID = async (id) => {

    let potencialUUID = uuidv4();
    let b=0;
    while (await getUserByUUID(potencialUUID) != null){
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

const getUserByUUID = async (uuidvar) => {
    try{
        const result = await UserUUID.findOne({
            where : {
              UUID : uuidvar
            }
          });

        if(result == null){
            return null;
        }
        return await findUserByID(result.vartotojo_ID);
    } catch(error){
        return null;
    }
    return null;
    
};

const getUUID_FromUserID = async (id) => {

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

export {createUserUUIDbyID, getUserByUUID, getUUID_FromUserID}