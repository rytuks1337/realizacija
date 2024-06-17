const express = require('express');
const tournamentController = require('../controllers/tournamentController');

const router = express.Router();
//POST
router.post('/create-tournament', tournamentController.createTournament);
router.post('/add-player', tournamentController.addPlayer);
router.post('/create-match', tournamentController.createMatch);
router.post('/update-match', tournamentController.updateMatch);

//GET
router.get('/matches', tournamentController.getMatches);
router.get('/state', tournamentController.getTournamentState);
router.get('/players', tournamentController.getPlayers);

module.exports = router;