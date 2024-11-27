import { validationResult } from 'express-validator';
import TournamentService from '../services/tournamentService.js';
import UuidService from '../services/uuidServices.js';
import MatchService from '../services/matchService.js';
import RoleService from '../services/roleService.js';
import BracketService from '../services/bracketService.js';
import TableService from '../services/tableService.js';
import RefereeService from '../services/refereeService.js';
import { ExtraError } from '../handlers/errorHandler.js';
//import { getAllPlayers } from './playerController.js'
//import { getMatchesByTournament } from './matchController.js';
//import { createMatch } from './matchController.js';
//import { shuffle } from '../utils/shuffle.js';


class TournamentController{

  static async createTournament (req, res) {

    const { pavadinimas, data, stalu_sk, lokacija, pradzia, pabaiga, aprasas } = req.body;
    var date;
    const organizatoriusVartotojo_ID = req.user;
    if(pradzia !== undefined){
      date=data+"T"+pradzia+":00:00.00Z";
    }else date=data+"T00:00:00.00Z";
    console.log(date);
    try {
      const tournament = await TournamentService.newTournament(organizatoriusVartotojo_ID, pavadinimas, date, lokacija, stalu_sk, pabaiga, aprasas);// Create tournament, add current user to owners and generate table objects.
      res.status(201).json({message: "Successfully created tournament", id: tournament.id });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static async startTournamnet (req, res){
    const {tournament_id} = req.params;
    try{
      await RefereeService.distributeRefs(tournament_id);
      await BracketService.initBracketsForTournament(tournament_id);
    }catch(error){
      if(error instanceof ExtraError){
        return res.status(error.statusCode).json({message: error.message});
        
      }
      return res.status(500).json({message: error.message});
    }

    res.status(200).json({message: "Succesfull"});
    //check if valid tournament
    //check for valid referees, players and groups.
    //generate tables for each of the groups
    //Change the state of the tournament to "Started"

  };

  static async updateTournamentStatus (req, res) {
    const { tournament_id } = req.params;
    const validStates = ['INIT', 'SETUP', 'REGISTER', 'IN_PROCCESS', 'FINISHED'];

    try {
      const tournament = await TournamentService.findTournamentById(tournament_id);
      if (tournament === undefined) {
        return res.status(404).json({ error: 'Tournament not found' });
      }
      if(tournament.status == "REGISTER"){
        return res.status(400).json({ error: 'You need to start the tournament' });
      }
      const currentStateIndex = validStates.indexOf(tournament.status);
      if (currentStateIndex === -1 || currentStateIndex === validStates.length - 1) {
        return res.status(400).json({ error: 'Invalid current state or state is already FINISHED' });
      }

      const newStatus = validStates[currentStateIndex + 1];
      tournament.status = newStatus;
      await tournament.save();

      res.status(200).json({ message: 'Tournament state updated successfully', status: newStatus });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static async getTournamentStatus (req, res) {
    const { tournament_id } = req.params;
    const status = await TournamentService.getTournamentState(tournament_id);
    res.status(200).json({ status: status });
  };

  static async get20Tournaments (req, res) {

    const {page} = req.params;
    try {
      if (page === undefined){
        const result = await TournamentService.get20Tournaments(1,20);
        if(result.length === 0){
          return res.status(404).json({message: "No results were found"});
          
        }
        res.status(200).json({result});
      }else {
        const result = await TournamentService.get20Tournaments(page,20);
        if(result.length === 0){
          return res.status(404).json({message: "No results were found"});
          
        }
        res.status(200).json({result});
      }
    } catch (error) {
      return res.status(500).json({error: error.message});
    }

  };

  static async getTournament (req, res) {
    const { tournament_id } = req.params;
    try {
      const tournament = await TournamentService.findTournamentById(tournament_id);
      res.status(200).json(tournament);
    } catch (error) {
      return res.status(404).json({message: "No results were found"});
    }
    return ;
  };


  static async getTournamentTable (req, res) {
    const { tournament_id } = req.params;

    try {
      const matches = await getMatchesByTournament(tournament_id);
      res.status(200).json(matches);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

}
export default TournamentController;
