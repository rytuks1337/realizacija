import { ExtraError } from "../handlers/errorHandler.js";
import BracketService from "../services/bracketService.js";
import GroupService from "../services/groupService.js";
import MatchService from "../services/matchService.js";


class GroupController{
  static async getAllGroupsbyTournament(req, res) {
    const { tournament_id } = req.params;
    try {
      let result = await GroupService.getAllGroupsbyTournament(tournament_id);
      for(let i=0;i<result.length;i++){
        if(result[i].lytis==="V"){
          result[i].lytis= "Vyrai";
        }
        if(result[i].lytis==="M"){
          result[i].lytis= "Moterys";
        }
        if(result[i].ranka==="K"){
          result[i].ranka="Kairė";
        }
        if(result[i].ranka==="D"){
          result[i].ranka="Dešinė";
        }
      }
      res.status(201).json({"data":result});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getGroupBracket(req, res) {
    const {group_id} = req.params;
    
    // try {
      let group = await GroupService.getGroupByID(group_id);
      let bracket = await BracketService.generateBracketObjNames(group);

      res.status(201).json({"losB":bracket.losB,"winB":bracket.winB});
    // } catch (error) {
    //   return res.status(500).json({ error: error.message });
    // }
  }

  static async createGroupsForTournament(req, res){
    const { tournament_id } = req.params;
    const data = req.body;
    try {
      await GroupService.createGroupsForTournament(tournament_id, data.data);
      res.status(200).json({message: "Successfuly created groups"});
    } catch (error) {
      if(error instanceof ExtraError){
        res.status(error.statusCode).json({error: error.message});
      }else{
        res.status(500).json({error: error.message});
      }
    }
    
    

  }

}


export default GroupController;