import { ExtraError } from '../handlers/errorHandler.js';
import Group from '../models/groupModel.js'; 
import { body, param } from 'express-validator';
import sequelize from 'sequelize';
import UserService from './userService.js';
import TournamentService from './tournamentService.js';
import RoleService from './roleService.js';

class GroupService{
  // Add new pogrupis
  static async createGroupsForTournament(turnyro_id, data) {
    var groups = {};
    groups.data = unloadJson(data);
    groups.order = getJsonOrder(data);
    console.log(groups.order);
    try {
      groups.data.forEach(value =>{
        Group.create({"lytis": value.lytis, "pavadinimas": value.pavadinimas, "amzius": value.metai, "ranka": value.ranka, "svoris":value.svoris, "turnyro_ID": turnyro_id })
      });
      
      await TournamentService.updateTournament(turnyro_id,{"tvarka": groups.order});
      
      
    } catch (error) {
      if(error instanceof ExtraError)
      throw new error;
    }
    return "success";
    
  }
  static async groupValid(groupID, user_id, data){
    const group = await this.getGroupByID(groupID);
    if(user_id!==undefined){
      const user = await UserService.findUserByID(user_id);
      if(group.lytis !== user.lytis){
        return false;
      }
    }else{
      if(group.lytis !== data.lytis){
        return false;
      }
    }
    if(!group.svoris.includes('+')){
      console.log(data);
      if(parseInt(group.svoris) < data.svoris){
        return false;
      }
    }
    const userAge = new Date(data.amzius);
    const currentDate = new Date();
    if(group.amzius!==null){
      if(currentDate.getFullYear() - userAge.getFullYear() < parseInt(group.amzius.replace('+',''))){
        return false;
      }
    }
    return true;
  }
  static async getValidGroups(tournament_id, user_id, userData){
    const tournamentGroups = await this.getAllGroupsbyTournament(tournament_id);
    var validgroups=[];
    for(const element of tournamentGroups){
      const bool = await this.groupValid(element.id, user_id, userData);
      if(bool){
        validgroups.push(element.id);
      }
    }
    return validgroups;
  }
  // Update pogrupis
  static async updatePogrupiai(id, data) {
    var group = await this.getGroupByID(id);
    if(data===undefined ||data===null){
      throw new ExtraError("Group not found", 404);
    }
    if(data.pavadinimas!==undefined){
      group.pavadinimas=data.pavadinimas;
    }
    if(data.svoris!==undefined){
      group.svoris=data.svoris;
    }
    if(data.amzius!==undefined){
      group.amzius=data.amzius;
    }
    if(data.bracket!==undefined){
      group.bracket=data.bracket;
    }
    if(data.lytis!==undefined){
      group.lytis=data.lytis;
    }
    if(data.ranka!==undefined){
      group.ranka=data.ranka;
    }
    await group.save();

  }
  // Get Groups of a selected tournament
  static async getAllGroupsbyTournament(tournament_id) {
    return Group.findAll({
      where:{
        turnyro_ID: tournament_id
      },
      order: [
        ['pavadinimas', 'ASC'], 
        ['lytis', 'ASC'],
        ['ranka', 'ASC'],
        [sequelize.literal(`
            CASE 
                WHEN svoris LIKE '+%' THEN 9999 -- Push "+xxx" values to the bottom
                WHEN svoris LIKE 'A%' THEN 9999
                ELSE CAST(svoris AS INTEGER)   -- Convert other weights to numbers for sorting
            END
          `),
        'ASC'
        ]   // Lastly by Weight in ascending order
      ]
    });
  }
  // Delete pogrupis
  static async deletePogrupiai(id) {

  }
  static async getGroupByID(id) {
    return Group.findByPk(id);
  }
  
  static async getDistributedGroupsOfTournament(tournament_id){
    const tournament = await TournamentService.findTournamentById(tournament_id);
    const groups = await this.getAllGroupsbyTournament(tournament_id);
    const order = tournament.tvarka;
    const tableDissplcment = Array.from({ length: tournament.stalu_sk }, () => []);
    var groupParticipantCounts = {};
    // For each group
    for (const element of groups) {
      const key = `${element.pavadinimas}_${element.lytis}`; // Create a 'key' - text that is unique to different groups, but not the weight classes.
      // Get participants of one of the groups
      const groupParticipants = await RoleService.getUsersByGroupID(element.id);

      // Create new counter if unique name doesn't exist and add to n existing count if it does exist.
      if (groupParticipantCounts[key]) {
        groupParticipantCounts[key] += groupParticipants.length;
      } else {
        groupParticipantCounts[key] = groupParticipants.length;
      }
    }
    const groupList = Object.entries(groupParticipantCounts).map(([key, count]) => {
      const [name, gender] = key.split('_');
        return { name, gender, count };
    }); // Grouplist consists of uniqe key per gender and the group name, used to get to know all of the group names

    // Sort `groupList` based on the order that the user has provided while creating the  in the `groups` array
    groupList.sort((a, b) => {
      const indexA = order[0].indexOf(a.name);
      const indexB = order[0].indexOf(b.name);
      return indexA - indexB;
    });
    let groupindex=0
    for(const element of groupList){
      tableDissplcment[groupindex % tournament.stalu_sk].push(getallGroupsFromGroupData(groups, element.name, element.gender));
      groupindex=groupindex+1;
    }
    return tableDissplcment;
  }
  static async getBracketByGroup(group_ID){
    const group = await this.getGroupByID(group_ID);
    if(group.length === 0 ){
        throw new ExtraError("No groups found", 404);
    }
    return group.bracket;
  }

}

function getallGroupsFromGroupData(groups, name, gender){
  var selected_groups=[];
  for(const element of groups){
    if(element.pavadinimas===name && element.lytis===gender){
      selected_groups.push(element.id);
    }
  }
  return selected_groups;
}

function getJsonOrder(obj){
  var order=[];
  var index=0;
  for(const gender of Object.keys(obj)){
    order.push([]);
    for(const name of Object.keys(obj[gender])){
      order[index].push(name);
    }
    index=index+1;
  }
  return order;
}

function unloadJson(obj, prefix = []) {
  var arrayResult = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      var newPrefix = [...prefix, key];
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        if(obj[key].age!==undefined){
          newPrefix = [...newPrefix, obj[key].age];
        }
        unloadJson(obj[key], newPrefix).forEach(value =>{
          arrayResult.push(value);
        });
      } else if (Array.isArray(obj[key])) {
        var metai;
        var ranka;
        if(newPrefix[2]==='K' || newPrefix[2]==='D'){
          metai=undefined;
          ranka=newPrefix[2]
        }else{
          metai=newPrefix[2];
          ranka=newPrefix[3];
        }
        obj[key].forEach(value => {
          arrayResult.push({"lytis": newPrefix[0], "pavadinimas": newPrefix[1], "metai": metai, "ranka": ranka, "svoris":value });
        });
      }
    }
  }
    return arrayResult;
}



export default GroupService;
