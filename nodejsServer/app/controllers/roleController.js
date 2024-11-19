import RoleService from '../services/roleService.js';
import { validationResult } from 'express-validator';

class RoleController {
  static async createRole(req, res) {
    try {
      const role = await RoleService.createRole(req.body);
      if(role === -1){
        res.status(403).json({ error: "Role is already created." });
        return;
      }
      res.status(201).json({ Success: "Role successfully created" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

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
      res.status(200).json(role);
    } catch (error) {
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