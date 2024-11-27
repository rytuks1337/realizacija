import { ExtraError } from "../handlers/errorHandler.js";
import GroupService from "../services/groupService.js";


class GroupController{
  static async getAllGroupsbyTournament(req, res) {
    const { tournament_id } = req.params;
    
    try {
      await GroupService.getAllGroupsbyTournament(tournament_id);
      res.status(201).json({"data":result});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getAllGroupsbyPlayerOfTournament(req, res) {
    
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