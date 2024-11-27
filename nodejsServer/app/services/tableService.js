import { ExtraError } from '../handlers/errorHandler.js';
import Stalas from '../models/tableModel.js';

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
    if(currentTable.lenkimo_id===null){
      currentTable.lenkimo_id = [match_id];
    }else{
      currentTable.lenkimo_id.push(match_id);
    }
      
    await currentTable.save();
  }

  static async getAllTablesOfTournament(tournament_id){
    return await Stalas.findAll({
      where:{
        turnyro_id: tournament_id
      }
    });
  }

  static async getTableByNr(tournament_id, nr){
    return await Stalas.findAll({
      where:{
        turnyro_id: tournament_id,
        nr: nr
      }
    });
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

}

export default TableService;