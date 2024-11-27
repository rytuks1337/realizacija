
import UuidService from '../services/uuidServices.js'

class UuidController{

  static async getUserWithUUID (req, res) {
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