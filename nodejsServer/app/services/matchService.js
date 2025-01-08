import { ExtraError } from "../handlers/errorHandler.js";
import Match from "../models/matchModel.js";
import TournamentService from "../services/tournamentService.js";
import GroupService from "../services/groupService.js";
import RoleService from "./roleService.js";
import TableService from "./tableService.js";
import BracketService from "./bracketService.js";
import PlayerTable from "../models/playerTableModel.js";
import Group from "../models/groupModel.js";

class MatchService{
  // Create match
  static async createMatch(match, grupeObj) {
    const {dalyvio_ID, dalyvio2_ID, laimetojoDalyvio_ID,pralaimetoDalyvio_ID, teisejai_ID, grupes_ID, roundNum, status} = match;

    const result = await Match.create({dalyvio_ID, dalyvio2_ID, laimetojoDalyvio_ID,pralaimetoDalyvio_ID, teisejai_ID, grupes_ID, status: status, round: roundNum});

    return result;
  };


  // Get match by ID
  static async getMatchById(id) {

    const result = await Match.findByPk(id);
    if(!result){
      throw new ExtraError("Match not found", 404);
    }
    return result;

  }

  static async updateMatch(data,matchID, tournament_id) {

    const result = await this.getMatchById(matchID);
    const group = await GroupService.getGroupByID(result.grupes_ID);
    if(group === null|| group === undefined)
    {
      throw new ExtraError("Nerasta kategorija",404);
    }
    if(group.turnyro_ID.toString() !== tournament_id){
      throw new ExtraError("Kova nesusijusi su varžybomis",404);
    }

    if(result.dalyvio_ID===data.laimetojas){
      result.laimetojoDalyvio_ID = data.laimetojas;
      result.pralaimetoDalyvio_ID = result.dalyvio2_ID;
      result.status='FINISHED';
    }else if(result.dalyvio2_ID===data.laimetojas){
      result.laimetojoDalyvio_ID = data.laimetojas;
      result.pralaimetoDalyvio_ID = result.dalyvio_ID;
      result.status='FINISHED';
    }else{
      throw new ExtraError("Žaidėjas nerastas",404);
    }

    let playerW = await PlayerTable.findByPk(result.laimetojoDalyvio_ID);
    let playerL = await PlayerTable.findByPk(result.pralaimetoDalyvio_ID);
    playerW.laimejimai=playerW.laimejimai+1;
    playerL.pralaimejimai=playerL.pralaimejimai+1;

    await playerW.save();
    await playerL.save();
    await result.save();
  
    let resultBracket = await BracketService.updateRound(group);
    if(resultBracket!==null){
      await TableService.updateTable(resultBracket.table_ID,resultBracket.delgroup);
    }


    return result;
  }


  // Update match
  static async updateMatchStatus(match) {
    const validStates = ['CREATED', 'IN_PROCCESS', 'FINISHED'];

    const currentStateIndex = validStates.indexOf(match.status);
    if (currentStateIndex === -1 || currentStateIndex === validStates.length - 1) {
      throw new ExtraError("Klaidinga stadija, arba jau pasibaigusios varžybos", 400);
    }
    const newStatus = validStates[currentStateIndex + 1];
    match.status = newStatus;
    await match.save();
    return true;
  }

  // Delete match
  static async deleteMatch(id) {
      await Match.destroy({
        where: {
          id: id,
        }
      });
      return result;
  }
  static async getMatchesForBrackets(group_ID) {
    return await Match.findAll({
        where:{
          grupes_ID: group_ID
        }
    });
  };
  static async getBracketNames(bracket){
    for(let i=0; i<bracket.winB.length; i++){
      for(let j=0; j<bracket.winB[i].length; j++){
          if(bracket.winB[i][j].changed()){
              await bracket.winB[i][j].save();
          }
          bracket.winB[i][j] = bracket.winB[i][j].id;
      }
  }
  for(let i=0; i<bracket.losB.length; i++){
      for(let j=0; j<bracket.losB[i].length; j++){
          if(bracket.losB[i][j].changed()){
              await bracket.losB[i][j].save();
          }
          bracket.losB[i][j] =  bracket.losB[i][j].id
      }
  }
  }
};



export default MatchService;
