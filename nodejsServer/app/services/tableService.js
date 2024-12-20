import { table } from 'console';
import { ExtraError } from '../handlers/errorHandler.js';
import Group from '../models/groupModel.js';
import Stalas from '../models/tableModel.js';
import GroupService from './groupService.js';
import MatchService from './matchService.js';
import PlayerTable from '../models/playerTableModel.js';
import Role from '../models/roleModel.js';

class TableService{

  static async createTable (id, nr) {
    return await Stalas.create({turnyro_id: id, nr});
  };

  static async addMatch(table_ID, match_id){
    
    const currentTable = await Stalas.findByPk(table_ID);

    if(currentTable.length===0){
      throw ExtraError("Table not found", 404);
    }
    if(match_id === undefined){
      throw ExtraError("Match not specified", 404);
    }
    let tempArray = currentTable.lenkimo_id
    ? [...currentTable.lenkimo_id]
    : [];
    if(tempArray===null || tempArray===undefined){
      tempArray = [match_id];
    }else{
      tempArray.push(match_id);
    }

    await currentTable.update({lenkimo_id: tempArray});
  }
  static async addGroup(currentTable, currentGroup, group_id){


    if(currentTable.length===0){
      throw ExtraError("Table not found", 404);
    }
    if(currentGroup.length === 0){
      throw ExtraError("Group not found", 404);
    }
    let tempArray = currentTable.lenkimo_id
    ? [...currentTable.lenkimo_id]
    : [];
    if(currentTable.dabartinisLenkimoGrupesID === null){
      if(currentTable.lenkimo_id !== undefined && currentTable.lenkimo_id !== null){

        currentTable.dabartinisLenkimoGrupesID = currentTable.lenkimo_id.at(0);
        tempArray.splice(0,1);
        currentTable.lenkimo_id=tempArray;
        if(tempArray===null || tempArray===undefined){
          tempArray = [group_id];
        }else{
          tempArray.push(group_id);
        }
      }else{
        currentTable.dabartinisLenkimoGrupesID = group_id;
      }
    }else{
      if(tempArray===null || tempArray===undefined){
        tempArray = [group_id];
      }else{
        tempArray.push(group_id);
      }
    }
    await currentTable.save();
    await currentTable.update({lenkimo_id: tempArray});
  }

  static async getAllTablesOfTournament(tournament_id){
    return await Stalas.findAll({
      where:{
        turnyro_id: tournament_id
      }
    });
  }

  static async getTableByNr(tournament_id, nr){
    let stalobj = await Stalas.findAll({
      where:{
        turnyro_id: tournament_id,
        nr: nr
      }
    });
    return stalobj[0];
  }

  static async getTableByID(id){
    return await Stalas.findByPk(id);
  }

  static async removeMatch(table_ID, match_id) {
    var currentTable = await Stalas.findByPk(table_ID);
    if(currentTable.length===0){
      throw ExtraError("Table not found", 404);
    }
    if(currentTable.lenkimo_id.includes(match_id)){
      const index = currentTable.lenkimo_id.indexOf(value);
      currentTable.lenkimo_id.splice(index, 1);

    }else{
      throw ExtraError("Match not specified", 500);
    }
    await currentTable.save();
  };
  static async getQueueTables(tournament_id){
    let tables = await this.getAllTablesOfTournament(tournament_id);
    if(tables === null){
      return null;
    }
    for(let i=0;i<tables.length;i++){
      if(tables[i].dabartinisLenkimoGrupesID!==null){
        tables[i]=tables[i].dataValues;
        let matchtemp= await MatchService.getMatchById(tables[i].dabartinisLenkimoGrupesID);
        if(matchtemp!==null){
          tables[i].dabartinisLenkimoGrupesID = matchtemp.dataValues;
          if(tables[i].dabartinisLenkimoGrupesID.dalyvio_ID){
            let tempplayer = await PlayerTable.findByPk(tables[i].dabartinisLenkimoGrupesID.dalyvio_ID);
            if(tempplayer && tempplayer.roles_ID){
                let tempRole = await Role.findByPk(tempplayer.roles_ID);
                tables[i].dabartinisLenkimoGrupesID.dalyvioN = tempRole.vardas+ " " + tempRole.pavarde;
            }
          }
          if(tables[i].dabartinisLenkimoGrupesID.dalyvio2_ID){
            let tempplayer = await PlayerTable.findByPk(tables[i].dabartinisLenkimoGrupesID.dalyvio2_ID);
            if(tempplayer && tempplayer.roles_ID){
                let tempRole = await Role.findByPk(tempplayer.roles_ID);
                tables[i].dabartinisLenkimoGrupesID.dalyvio2N = tempRole.vardas+ " " + tempRole.pavarde;
            }
          }

        }
        for(let j=0;j<tables[i].lenkimo_id.length;j++){
          let matchtemp2= await MatchService.getMatchById(tables[i].lenkimo_id[j]);
          if(matchtemp!==null){
            tables[i].lenkimo_id[j] = matchtemp2.dataValues;
            if(tables[i].lenkimo_id[j].dalyvio_ID){
              let tempplayer = await PlayerTable.findByPk(tables[i].lenkimo_id[j].dalyvio_ID);
              if(tempplayer && tempplayer.roles_ID){
                  let tempRole = await Role.findByPk(tempplayer.roles_ID);
                  tables[i].lenkimo_id[j].dalyvioN = tempRole.vardas+ " " + tempRole.pavarde;
              }
            }
            if(tables[i].lenkimo_id[j].dalyvio2_ID){
              let tempplayer = await PlayerTable.findByPk(tables[i].lenkimo_id[j].dalyvio2_ID);
              if(tempplayer && tempplayer.roles_ID){
                  let tempRole = await Role.findByPk(tempplayer.roles_ID);
                  tables[i].lenkimo_id[j].dalyvio2N = tempRole.vardas+ " " + tempRole.pavarde;
              }
            }
          }
        }
      }
    }
    return tables;
  }

}

export default TableService;