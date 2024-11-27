import UserService from '../services/userService.js';
import UuidService from '../services/uuidServices.js'
import bcrypt from 'bcryptjs'

class UserController {

  static async registerUser (req, res) {

    const { vardas, pavarde, amzius, el_pastas, slaptazodis, lytis } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(slaptazodis, 10);
      
      const user = await UserService.createUser({ vardas, pavarde, amzius, el_pastas, slaptazodis: hashedPassword, lytis });
      
      const newUUID = await UuidService.createUserUUIDbyID({vartotojo_ID: user['id']});
      res.status(201).json({"message":"Success"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static async getUserfromUUID (req, res) {
    const id = req.user;
    try {
        const result = await UuidService.getUserByUUID(id);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

  static async editUser(req, res){
    const id = req.user;
    
    try {
      var { vardas, pavarde, amzius, svoris, el_pastas, slaptazodis, lytis } = req.body;
      
      const result = await UserService.editUser(id, {vardas, pavarde, amzius, svoris, el_pastas, slaptazodis, lytis});
      
      res.status(200).json({message: "User successfuly updated"});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

  }
}
export default UserController;