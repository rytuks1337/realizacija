import { ExtraError } from '../handlers/errorHandler.js';
import Tournament from '../models/tournamentModel.js';
import RoleService from '../services/roleService.js'
import TableService from '../services/tableService.js'
import seq from 'sequelize';

class TournamentService {

  static async newTournament (organizatoriusVartotojo_ID, pavadinimas, data, lokacija, stalu_sk, pabaiga, aprasas, filepath) {
    const newtournament = await Tournament.create({pavadinimas, status : "INIT", data, lokacija, stalu_sk, pabaiga, aprasas, filepath}); //Sukuriamas turnyras ir įrašomas į duomenų bazę.
    const newRole = await RoleService.createRole(newtournament.id, organizatoriusVartotojo_ID, {role: "Owner"}); // Pridedama nauja rolė vartotojui, kuris sukūrė turnyrą.
    for (let index = 0; index < stalu_sk; index++) {
      const element = await TableService.createTable(newtournament.id, index);
    }
    return newtournament.id;
  }; 

  static async getTournamentState (tournament_id){
    const status = await Tournament.findByPk(tournament_id);
    return status.status;
  }

  static async startTournament(tournament_id){
    const tournament = await Tournament.findByPk(tournament_id);
    tournament.status = 'IN_PROCCESS';
    tournament.save();
  }
  
  static async findTournamentById(id){
    return await Tournament.findByPk(id);
  }
  static async  get20Tournaments(page = 1, limit = 20, options={'search':'','isMine':false, 'hasPrivilages':false, 'participant':false}, userID=null){
    const currentDate = new Date();
    const offset = (page - 1) * limit;
    if(options.search===undefined){
      options.search ='';
    }
    let whereC= {
      status: {
        [seq.Op.in]: ['IN_PROCCESS', 'REGISTER', 'FINISHED'], // Filtravimo operatorius, paimami tik tie įrašai, kuriuose yra minėta reikšmė.
      },
    }
    if(options.isMine || options.hasPrivilages || options.participant){
      if(userID!==null){
        let ownerInTournaments = []
        let allRolesOfUser= await RoleService.getAllRolesByUserId(userID);
        for(let i=0;i<allRolesOfUser.length;i++){
          if((options.isMine && allRolesOfUser[i].vartotojo_tipas==='Owner') || (options.participant && allRolesOfUser[i].vartotojo_tipas==='Participant') || (options.hasPrivilages && (allRolesOfUser[i].vartotojo_tipas==='Judge' || allRolesOfUser[i].vartotojo_tipas==='Organizer'))){
            if(ownerInTournaments.indexOf(allRolesOfUser[i].turnyro_ID)===-1){
              ownerInTournaments.push(allRolesOfUser[i].turnyro_ID);
            }
          }
        }
        if(ownerInTournaments.length>0){
          whereC['id']=({[seq.Op.in]:ownerInTournaments});
        }else{return null}
      }
    }

    if(options.isMine || options.hasPrivilages){
      whereC['status']= { [seq.Op.in]: ['IN_PROCCESS', 'REGISTER', 'SETUP', 'INIT', 'FINISHED']}
    }
    if(options.search!==''){
      whereC['pavadinimas'] = {[seq.Op.startsWith]: options.search}
    }

    let tournaments= await Tournament.findAll({
      where: whereC,
      order: [
        ['status', 'DESC'], // Pertvarkoma, jog 'IN_PROCCESS', būtu pirmiau (nes raidė R>I).
        [seq.literal('CASE WHEN status = \'IN_PROCCESS\' THEN pavadinimas END'), 'ASC'],
        [seq.literal('CASE WHEN status = \'REGISTER\' THEN EXTRACT(EPOCH FROM AGE(data, NOW())) END'), 'ASC'], // Kiekvienam iš įrašų, kurie turi 'REGISTER' reikšmę, apskaičiuojama datos skirtumas su dabartine data ir išfiltruojami įrašai nuo mažiausio iki didžiausio laiko skirtumo.
      ],
      offset,
      limit, //20 turnyrų limitas.
    });

    return tournaments;
  }
  static async updateTournament(id, data){
    var tournament = await Tournament.findByPk(id);

    if(tournament.length===0){
      throw new ExtraError("Unable to find tournament", 404);
    }
    if(data===undefined){
      throw new ExtraError("A change in data must be present", 404);
    }
    if(data.pavadinimas!==undefined){
      tournament.pavadinimas=data.pavadinimas;
    }
    if(data.data!==undefined){
      tournament.data=data.data;
    }
    if(data.lokacija!==undefined){
      tournament.lokacija=data.lokacija;
    }
    if(data.stalu_sk!==undefined){
      const state = await this.getTournamentState(id);
      if(state==='IN_PROCCESS'||state==='FINISHED'){
        throw new ExtraError("It is to late to change the table ammount", 404);
      }
      tournament.pavadinimas=data.stalu_sk;
    }
    if(data.tvarka!==undefined){
      console.log("IAMHEREOOO");
      tournament.tvarka=data.tvarka;
    }
    if(data.pabaiga!==undefined){
      tournament.pabaiga=data.pabaiga;
    }
    if(data.aprasas!==undefined){
      tournament.aprasas=data.aprasas;
    }
    console.log(tournament);
    return await tournament.save();
  }

}



export default TournamentService;