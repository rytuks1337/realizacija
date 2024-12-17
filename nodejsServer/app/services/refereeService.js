import { ExtraError } from "../handlers/errorHandler.js";
import RoleService from "./roleService.js";
import TableService from "./tableService.js";

class RefereeService{

  static async distributeRefs(tournament_id) {
    const refs = await RoleService.getAllTournamentReferees(tournament_id);
    var tables = await TableService.getAllTablesOfTournament(tournament_id);
    if(tables.length>refs.length){
      throw new ExtraError("Not enough referees", 403);
    }
    var final = [];
    for (let index = 0; index < refs.length; index++) {
      if(final[index%tables.length]===undefined ||final[index%tables.length]===null){
        final[index%tables.length] = [];
      }
        final[index%tables.length].push(refs[index].id);
    }
    for (let index = 0; index < tables.length; index++) {
      tables[index].teiseju_id = final[index];
      await tables[index].save()
    }
  };
}
export default RefereeService;
