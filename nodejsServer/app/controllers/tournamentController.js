import { validationResult } from 'express-validator';
import TournamentService from '../services/tournamentService.js';
import UuidService from '../services/uuidServices.js';
//import { getAllPlayers } from './playerController.js'
//import { getMatchesByTournament } from './matchController.js';
//import { createMatch } from './matchController.js';
//import { shuffle } from '../utils/shuffle.js';


class TournamentController{

  static async createTournament (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { pavadinimas, data, stalu_sk, lokacija, pradzia, pabaiga, aprasas } = req.body;
    const organizatoriusVartotojo_ID = (await UuidService.getUserByUUID(req.user)).id;
    try {
      const tournament = await TournamentService.newTournament(organizatoriusVartotojo_ID, pavadinimas, data, lokacija, stalu_sk, pradzia, pabaiga, aprasas);

      res.status(201).json({message: "Successfully created tournament", id: tournament.id });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static async startTournamnet (req, res){
    //check if valid tournament
    //check for valid referees, players and groups.
    //generate tables for each of the groups
    //Change the state of the tournament to "Started"

  };

  static async updateTournamentState (req, res) {
    const { tournament_id } = req.params;
    const validStates = ['INIT', 'SETUP', 'REGISTER', 'IN_PROCESS', 'FINISHED'];

    try {
      const tournament = await TournamentService.findTournamentById(tournament_id);
      if (!tournament) {
        return res.status(404).json({ error: 'Tournament not found' });
      }

      const currentStateIndex = validStates.indexOf(tournament.state);
      if (currentStateIndex === -1 || currentStateIndex === validStates.length - 1) {
        return res.status(400).json({ error: 'Invalid current state or state is already FINISHED' });
      }

      const newState = validStates[currentStateIndex + 1];
      tournament.state = newState;
      await tournament.save();

      res.status(200).json({ message: 'Tournament state updated successfully', state: newState });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static async getTournamentState  (req, res) {

  };
  static async get20Tournaments  (req, res) {
    
  };
  static async getTournament (req, res) {

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
