
import UuidService from '../services/uuidServices.js'
import { validationResult } from 'express-validator';

class UuidController{

  static async getUserWithUUID (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
    }
    try {
      const userUUID = req.params.uuid;

      const user = await UuidService.getUserByUUID(userUUID);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({Vardas : user.vardas});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default UuidController;