import { syslog } from 'winston/lib/winston/config/index.js';
import Role from '../models/roleModel.js'

class RoleService {
  static async createRole(tournament_id, user_id, role) {

    const test = await this.getRoleByUserId(tournament_id, user_id, role); //Checking if role already exists
    if(test.length!==0){
      return -1;
    }
    /////////////////////
    //Creating and returning the created role
    return await Role.create({"vartotojo_ID" : user_id, "vartotojo_tipas" : role, "turnyro_ID" : tournament_id});
  }

  static async getRolesByUserId(tournament_idData, userId) {
    return await Role.findAll({
      where : {
        "turnyro_ID" : tournament_idData,
        "vartotojo_ID" : userId
      }
    });
  }
  static async getRoleByUserId(tournament_idData, userId, role) {
    console.log(tournament_idData,userId,role);
    return await Role.findAll({
      where : {
        "turnyro_ID" : tournament_idData,
        "vartotojo_ID" : userId,
        "vartotojo_tipas" : role
      }
    });
  }

  static async updateRole(roleId, roleData) {
    const role = await Role.findByPk(roleId);
    if (!role) {
      throw new Error('Role not found');
    }
    return role.update(roleData);
  }

  static async deleteRole(roleId) {
    const role = await Role.findByPk(roleId);
    if (!role) {
      throw new Error('Role not found');
    }
    return role.destroy();
  }
}

export default RoleService;