import { syslog } from 'winston/lib/winston/config/index.js';
import Role from '../models/roleModel.js';
import UuidService from './uuidServices.js';
import { ExtraError } from '../handlers/errorHandler.js';
import PlayerTable from '../models/playerTableModel.js'
import sequelize from 'sequelize';
import GroupService from './groupService.js';
import UserService from './userService.js';
import TournamentService from './tournamentService.js';

class RoleService {
  static async createRole(tournament_id, user_id, data) {
    //Try to get the role, that is being created.
    if(user_id===undefined){
      if(data.role!=='Participant'){
        throw new ExtraError("User must have an account for him to have this role", 400);
      }
      if(data.vardas===undefined){
        throw new ExtraError("Name is not defined", 400);
      }
      if(data.pavarde===undefined){
        throw new ExtraError("Surname is not defined", 400);
      }
      if(data.amzius===undefined){
        throw new ExtraError("Age is not defined", 400);
      }
      if(data.lytis===undefined){
        throw new ExtraError("Gender is not defined", 400);
      }

      for (let index = 0; index < data.grupes.length; index++) {
        if(!(await GroupService.groupValid(data.grupes[index], user_id, data))){
          throw new ExtraError("User or one of the users do not meet one or more requirments of the selected groups");
        }
      }
      const role = await Role.create({"vardas": data.vardas, "pavarde": data.pavarde, "amzius": data.amzius, "svoris": data.svoris, "lytis": data.lytis, "vartotojo_tipas": data.role, "turnyro_ID" : tournament_id, "grupiu_id": data.grupes});
      for (let index = 0; index < data.grupes.length; index++) {
        await PlayerTable.create({"roles_ID": role.id, "grupes_id": data.grupes[index]});
      }
      
      if(role.length===0){
        throw new Error("Error creating role for a user");
      }
      return role;
    }else{
      const test = await this.getRoleByUserIdAndRole(tournament_id, user_id, data.role);
      //Checking if role already exists
      if(test.length>0){
        throw new ExtraError("User already registered for this role", 409); 
      }
    }

    //Creating and returning the created role
    return await Role.create({"vartotojo_ID" : user_id, "vartotojo_tipas" : data.role, "turnyro_ID" : tournament_id, "amzius": data.amzius, "svoris": data.svoris, "grupiu_id": data.grupes});
  }
  static async generateTest(tournament_id) {
    const tournament = await TournamentService.findTournamentById(tournament_id);
    var testCases = [
      { vardas: "John", pavarde: "Doe", amzius: 25, svoris: 70, lytis: "V" },
      { vardas: "Jane", pavarde: "Smith", amzius: 30, svoris: 60, lytis: "M" },
      { vardas: "Alice", pavarde: "Johnson", amzius: 22, svoris: 55, lytis: "M" },
      { vardas: "Bob", pavarde: "Williams", amzius: 28, svoris: 75, lytis: "V" },
      { vardas: "Charlie", pavarde: "Brown", amzius: 35, svoris: 80, lytis: "V" },
      { vardas: "Diana", pavarde: "Jones", amzius: 29, svoris: 65, lytis: "M" },
      { vardas: "Eve", pavarde: "Miller", amzius: 24, svoris: 58, lytis: "M" },
      { vardas: "Frank", pavarde: "Davis", amzius: 40, svoris: 72, lytis: "V" },
      { vardas: "Grace", pavarde: "Garcia", amzius: 27, svoris: 62, lytis: "M" },
      { vardas: "Hank", pavarde: "Rodriguez", amzius: 31, svoris: 78, lytis: "V" },
      { vardas: "Ivy", pavarde: "Martinez", amzius: 26, svoris: 61, lytis: "M" },
      { vardas: "Jack", pavarde: "Hernandez", amzius: 33, svoris: 73, lytis: "V" },
      { vardas: "Kate", pavarde: "Lopez", amzius: 23, svoris: 57, lytis: "M" },
      { vardas: "Leo", pavarde: "Gonzalez", amzius: 34, svoris: 76, lytis: "V" },
      { vardas: "Mia", pavarde: "Wilson", amzius: 28, svoris: 63, lytis: "M" },
      { vardas: "Nick", pavarde: "Anderson", amzius: 40, svoris: 74, lytis: "V" },
      { vardas: "Olivia", pavarde: "Thomas", amzius: 25, svoris: 59, lytis: "M" },
      { vardas: "Paul", pavarde: "Taylor", amzius: 31, svoris: 77, lytis: "V" },
      { vardas: "Quinn", pavarde: "Moore", amzius: 27, svoris: 64, lytis: "M" },
      { vardas: "Ryan", pavarde: "Jackson", amzius: 32, svoris: 79, lytis: "V" },
      { vardas: "Sara", pavarde: "Martin", amzius: 26, svoris: 60, lytis: "M" },
      { vardas: "Tom", pavarde: "Lee", amzius: 33, svoris: 71, lytis: "V" },
      { vardas: "Uma", pavarde: "Perez", amzius: 40, svoris: 56, lytis: "M" },
      { vardas: "Victor", pavarde: "Thompson", amzius: 34, svoris: 78, lytis: "V" },
      { vardas: "Wendy", pavarde: "White", amzius: 28, svoris: 62, lytis: "M" },
      { vardas: "Xavier", pavarde: "Harris", amzius: 30, svoris: 75, lytis: "V" },
      { vardas: "Yara", pavarde: "Clark", amzius: 40, svoris: 59, lytis: "M" },
      { vardas: "Zack", pavarde: "Lewis", amzius: 31, svoris: 76, lytis: "V" },
      { vardas: "Ava", pavarde: "Robinson", amzius: 27, svoris: 61, lytis: "M" },
      { vardas: "Ben", pavarde: "Walker", amzius: 32, svoris: 77, lytis: "V" },
      { vardas: "Cara", pavarde: "Young", amzius: 26, svoris: 60, lytis: "M" },
      { vardas: "Dan", pavarde: "Hall", amzius: 33, svoris: 78, lytis: "V" },
      { vardas: "Ella", pavarde: "Allen", amzius: 24, svoris: 57, lytis: "M" },
      { vardas: "Finn", pavarde: "King", amzius: 34, svoris: 79, lytis: "V" },
      { vardas: "Gina", pavarde: "Wright", amzius: 28, svoris: 62, lytis: "M" },
      { vardas: "Harry", pavarde: "Scott", amzius: 30, svoris: 75, lytis: "V" },
      { vardas: "Iris", pavarde: "Green", amzius: 25, svoris: 59, lytis: "M" },
      { vardas: "Jake", pavarde: "Baker", amzius: 40, svoris: 76, lytis: "V" },
      { vardas: "Kira", pavarde: "Adams", amzius: 27, svoris: 61, lytis: "M" },
      { vardas: "Liam", pavarde: "Nelson", amzius: 32, svoris: 77, lytis: "V" },
      { vardas: "Mona", pavarde: "Mitchell", amzius: 26, svoris: 60, lytis: "M" },
      { vardas: "Noah", pavarde: "Carter", amzius: 33, svoris: 78, lytis: "V" },
      { vardas: "Owen", pavarde: "Roberts", amzius: 24, svoris: 57, lytis: "V" },
      { vardas: "Pam", pavarde: "Turner", amzius: 34, svoris: 79, lytis: "M" },
      { vardas: "Quincy", pavarde: "Phillips", amzius: 40, svoris: 62, lytis: "V" },
      { vardas: "Rachel", pavarde: "Campbell", amzius: 30, svoris: 75, lytis: "M" },
      { vardas: "Sam", pavarde: "Parker", amzius: 25, svoris: 59, lytis: "V" },
      { vardas: "Tina", pavarde: "Evans", amzius: 40, svoris: 76, lytis: "M" },
      { vardas: "Ulysses", pavarde: "Edwards", amzius: 27, svoris: 61, lytis: "V" },
      { vardas: "Vera", pavarde: "Collins", amzius: 32, svoris: 77, lytis: "M" },
      { vardas: "Walter", pavarde: "Stewart", amzius: 26, svoris: 60, lytis: "V" },
      { vardas: "Xena", pavarde: "Sanchez", amzius: 40, svoris: 78, lytis: "M" },
      { vardas: "Yuri", pavarde: "Morris", amzius: 24, svoris: 57, lytis: "V" },
      { vardas: "Zara", pavarde: "Rogers", amzius: 34, svoris: 79, lytis: "M" },
      { vardas: "Aaron", pavarde: "Reed", amzius: 28, svoris: 62, lytis: "V" },
      { vardas: "Bella", pavarde: "Cook", amzius: 30, svoris: 75, lytis: "M" },
      { vardas: "Carl", pavarde: "Morgan", amzius: 40, svoris: 59, lytis: "V" },
      { vardas: "Dana", pavarde: "Bell", amzius: 31, svoris: 76, lytis: "M" },
      { vardas: "Ethan", pavarde: "Murphy", amzius: 27, svoris: 61, lytis: "V" },
      { vardas: "Fiona", pavarde: "Bailey", amzius: 32, svoris: 77, lytis: "M" },
      { vardas: "Greg", pavarde: "Rivera", amzius: 26, svoris: 60, lytis: "V" },
      { vardas: "Hannah", pavarde: "Cooper", amzius: 33, svoris: 78, lytis: "M" },
      { vardas: "Ian", pavarde: "Richardson", amzius: 24, svoris: 57, lytis: "V" },
      { vardas: "Jasmine", pavarde: "Cox", amzius: 40, svoris: 79, lytis: "M" },
      { vardas: "Kevin", pavarde: "Howard", amzius: 28, svoris: 62, lytis: "V" },
      { vardas: "Linda", pavarde: "Ward", amzius: 30, svoris: 75, lytis: "M" },
      { vardas: "Mike", pavarde: "Torres", amzius: 40, svoris: 59, lytis: "V" },
      { vardas: "Nina", pavarde: "Peterson", amzius: 31, svoris: 76, lytis: "M" },
      { vardas: "Oscar", pavarde: "Gray", amzius: 27, svoris: 61, lytis: "V" },
      { vardas: "Peter", pavarde: "Ramirez", amzius: 40, svoris: 77, lytis: "V" },
      { vardas: "Queen", pavarde: "James", amzius: 26, svoris: 60, lytis: "M" },
      { vardas: "Robert", pavarde: "Watson", amzius: 40, svoris: 78, lytis: "V" },
      { vardas: "Sophia", pavarde: "Brooks", amzius: 24, svoris: 57, lytis: "M" },
      { vardas: "Tim", pavarde: "Kelly", amzius: 34, svoris: 79, lytis: "V" },
      { vardas: "Ursula", pavarde: "Sanders", amzius: 28, svoris: 62, lytis: "M" },
      { vardas: "Vince", pavarde: "Price", amzius: 40, svoris: 75, lytis: "V" },
      { vardas: "Wanda", pavarde: "Bennett", amzius: 25, svoris: 59, lytis: "M" },
      { vardas: "Xander", pavarde: "Wood", amzius: 31, svoris: 76, lytis: "V" },
      { vardas: "Yvonne", pavarde: "Barnes", amzius: 27, svoris: 61, lytis: "M" },
      { vardas: "Zachary", pavarde: "Ross", amzius: 32, svoris: 77, lytis: "V" }
    ];

    for(const element of testCases){
      const today = new Date(); 
      const birthYear = today.getFullYear() - element.amzius; 
      element.amzius = new Date(birthYear, 0, 1);
      element.role = 'Participant';
      var possibleGroups = await GroupService.getValidGroups(tournament_id, undefined, element);
      if(possibleGroups.length>1){
        possibleGroups = [possibleGroups[Math.floor(Math.random() * (possibleGroups.length-1))], possibleGroups[Math.floor(Math.random() * (possibleGroups.length-1))]];
      }
      element.grupes=possibleGroups;
      await this.createRole(tournament_id, undefined, element);
    }
  }
  static async getRolesByUserId(tournament_idData, userId) {
    return await Role.findAll({
      where : {
        "turnyro_ID" : tournament_idData,
        "vartotojo_ID" : userId
      }
    });
  }
  static async getRoleByUserIdAndRole(tournament_idData, userId, role) {

    return await Role.findAll({
      where : {
        "turnyro_ID" : tournament_idData,
        "vartotojo_ID" : userId,
        "vartotojo_tipas" : role
      }
    });
  }

  static async getRoleByUserId(userId) {

    return await Role.findByPk(userId);
  }

  static async getAllTournamentReferees(tournament_id){
    return await Role.findAll({
      where : {
        "turnyro_ID" : tournament_id,
        "vartotojo_tipas" : "Judge"
      }
    });
  }

  static async getUsersByGroupID(group_ID) {

    return await Role.findAll({
      where : {
        grupiu_id: {
          [sequelize.Op.contains]: [group_ID],
        },
      },
    });
  }


  static async updateRole(roleId, roleData) {
    const roleObj = await Role.findByPk(roleId);
    const {uuid, grupes, vardas, pavarde, amzius, svoris, lytis, role} = roleData;
    var hasuuid=false;
    if(roleObj.vartotojo_ID!==undefined){
      hasuuid = true;
    }
    if (!role) {
      throw new Error('Role not found');
    }
    if(uuid !== undefined){
      roleObj.vartotojo_ID = await UuidService.getUserByUUID(uuid);
      if(roleObj.vartotojo_ID===null||roleObj.vartotojo_ID===undefined){
        throw new ExtraError("User not found", 404);
      }
      hasuuid=true;
    }
    if(role !== undefined){
      roleObj.role= role;
    }
    if(grupes !== undefined){
      roleObj.grupiu_id= grupes;
    }
    if(vardas !== undefined){
      roleObj.vardas= vardas;
    } else if(!hasuuid){
      throw new ExtraError("Name is required", 400);
    }
    if(pavarde !== undefined){
      roleObj.pavarde= pavarde;
    }else if(!hasuuid){
      throw new ExtraError("Surname is required", 400);
    }
    if(amzius !== undefined){
      roleObj.amzius= amzius;
    }else if(!hasuuid){
      throw new ExtraError("Age is required", 400);
    }
    if(svoris !== undefined){
      roleObj.svoris= svoris;
    }
    if(lytis !== undefined){
      if(lytis === 'M'){
        lytis = 'V';
      }
      roleObj.lytis= lytis;
    }else if(!hasuuid){
      throw new ExtraError("Age is required", 400);
    }
    await roleObj.save();
    return;
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