import Tournament from '../models/tournamentModel.js';
import RoleService from '../services/roleService.js'

class TournamentService {

  static async newTournament (organizatoriusVartotojo_ID, pavadinimas, data, lokacija, stalu_sk, pradzia, pabaiga, aprasas) {
    const newtournament = await Tournament.create({pavadinimas, status : "INIT", data, lokacija, stalu_sk, pradzia, pabaiga, aprasas});
    const newRole = await RoleService.createRole(newtournament.id, organizatoriusVartotojo_ID, "Owner");
    console.log(newRole.id);
    return newtournament.id;
  };

}



export default TournamentService;