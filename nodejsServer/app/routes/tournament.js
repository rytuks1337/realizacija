const express = require('express');
const { createT, generateMatches, getTournamentTable, getTournaments } = require('../controllers/tournamentController.js');
const { createTournamentValidation } = require('../validators/tournamentValidator.js');
const { authenticateToken, authorizeRole } = require('../middleware/auth.js');
const router = express.Router();

router.post('/', authenticateToken, createTournamentValidation, createT);
router.post('/:tournament_id/generate', authenticateToken, authorizeRole('Organizer'), generateMatches);
router.get('/:tournament_id/table', authenticateToken, getTournamentTable);
router.get('/', getTournaments);

module.exports = router;
