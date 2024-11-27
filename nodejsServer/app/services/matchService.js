import { ExtraError } from "../handlers/errorHandler.js";
import Match from "../models/matchModel.js";
import TournamentService from "../services/tournamentService.js";
import GroupService from "../services/groupService.js";
import RoleService from "./roleService.js";
import TableService from "./tableService.js";
import BracketService from "./bracketService.js";

class MatchService{
  // Create match
  static async createMatch(match, table_id) {
    const {dalyvio_ID, dalyvio2_ID, laimetojoDalyvio_ID,pralaimetoDalyvio_ID, teisejai_ID, grupes_ID} = match;

    const result = await Match.create({dalyvio_ID, dalyvio2_ID, laimetojoDalyvio_ID,pralaimetoDalyvio_ID, teisejai_ID, grupes_ID, status: 'CREATED' });
    await TableService.addMatch(table_id,result.id);

    return result;
  };


  // Get match by ID
  static async getMatchById(id) {

    const result = await Match.findByPk(id);
    if(result.length===0){
      throw new ExtraError("Match not found", 404);
    }
    return result;

  }

  // Update match
  static async updateMatchStatus(id) {
    const match = await this.getMatchById(id);
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
    //const { tournament_id } = req.params;
    //const tournament = await TournamentService.findTournamentById(tournament_id);
    //const groups = await GroupService.getGroupByID(group_ID);
    //const bracket = await BracketService.
    

  };
};



export default MatchService;
