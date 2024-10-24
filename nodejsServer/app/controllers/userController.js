import {createUser, } from '../services/userService.js';
import {createUserUUIDbyID, getUserByUUID} from '../services/uuidServices.js'
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs'

const registerUser = async (req, res) => {
    
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { vardas, pavarde, amzius, el_pastas, slaptazodis, lytis } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(slaptazodis, 10);
      
      const user = await createUser({ vardas, pavarde, amzius, el_pastas, slaptazodis: hashedPassword, lytis });
      
      const newUUID = await createUserUUIDbyID({vartotojo_ID: user['id']});
      console.log(3);
      res.status(201).json({"message":"Success"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const getUserfromUUID = async (req, res) => {
    const id = req.user;
    try {
        const result = await getUserByUUID(id);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {registerUser, getUserfromUUID};