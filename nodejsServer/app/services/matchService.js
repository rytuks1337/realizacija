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
    const {dalyvio_ID, dalyvio2_ID, laimetojoDalyvio_ID,pralaimetoDalyvio_ID, teisejai_ID, grupes_ID, roundNum} = match;

    const result = await Match.create({dalyvio_ID, dalyvio2_ID, laimetojoDalyvio_ID,pralaimetoDalyvio_ID, teisejai_ID, grupes_ID, status: 'CREATED', round: roundNum});

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
  static async updateMatch(data,matchID) {

    const result = await this.getMatchById(matchID);
    const group = await GroupService.getGroupByID(result.group);
    result.laimetojoDalyvio_ID = data.winner;
    result.pralaimetoDalyvio_ID = data.loser;

    let playerW = await PlayerTable.findByPk(data.winner);
    let playerL = await PlayerTable.findByPk(data.loser);
    playerW.laimejimai=playerW.laimejimai+1;
    playerL.pralaimejimai=playerL.pralaimejimai+1;

    await playerW.save();
    await playerL.save();
    await result.save();
    await BracketService.updateRound(group);

    return result;
  }


  // Update match
  static async updateMatchStatus(match) {
    const validStates = ['INIT', 'SETUP', 'IN_PROCCESS', 'FINISHED'];

    const currentStateIndex = validStates.indexOf(match.status);
    if (currentStateIndex === -1 || currentStateIndex === validStates.length - 1) {
      throw new ExtraError("Invalid current state or state is already FINISHED", 400);
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
  static async generateMatchesForBrackets(group_ID) {
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
