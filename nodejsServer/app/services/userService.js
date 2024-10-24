import User from '../models/userModel.js';



const createUser = async (userData) => {
  return await User.create(userData);
};

const findUserByEmail = async (email) => {
  const result = await User.findOne({
    where : {
      el_pastas : email
    }
  })
  return result;
};

const findUserByID = async (userID) => {

  const result = await User.findOne({
    where : {
      id : userID
    }
  })
  return result;
};



export { createUser, findUserByEmail, findUserByID };