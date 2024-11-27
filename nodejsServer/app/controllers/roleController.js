import RoleService from '../services/roleService.js';
import { validationResult } from 'express-validator';
import UserService from '../services/uuidServices.js';
import { ExtraError } from '../handlers/errorHandler.js';

class RoleController {
  static async createRole(req, res) {
    const data=req.body;
    const {tournament_id} = req.params;
    var user_id=undefined;
    if(data === null || data === undefined){
      return res.status(400).json({ error: "No data provided" });
    }
    try {
      if(data.uuid!==undefined){
        user_id = await UserService.getUserIdByUUID(data.uuid);
        if(user_id===null){
          throw new ExtraError("User does not exist", 404);
        }
      }
      
      const role = await RoleService.createRole(tournament_id,user_id,data);
      res.status(201).json({ Success: "Role successfully created" });
    } catch (error) {
      if(error instanceof ExtraError){
        res.status(error.statusCode).json({ error: error.message });
      }else{
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async test (req, res){
    const { tournament_id } = req.params;
    await RoleService.generateTest(tournament_id);
    res.status(200).json({message: "Succesfull"});
  };
  
  static async getRoleByUserId(req, res) {
    try {
      const role = await RoleService.getRoleByUserId(req.params.id);
      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateRole(req, res) {
    try {
      const role = await RoleService.updateRole(req.params.id, req.body);
      res.status(200).json({"message": "Succesfully updated role"});
    } catch (error) {
      if(error instanceof ExtraError){
        res.status(error.statusCode).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteRole(req, res) {
    try {
      await RoleService.deleteRole(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default RoleController;