const express = require('express');
const { createT, generateMatches, getTournamentTable } = require('../controllers/tournamentController.js');
const { createTournamentValidation } = require('../validators/tournamentValidator.js');
const { authenticateToken, authorizeRole } = require('../middleware/auth.js');
const router = express.Router();

router.post('/', authenticateToken, createTournamentValidation, createT);
router.post('/:tournament_id/generate', authenticateToken, authorizeRole('Organizer'), generateMatches);
router.get('/:tournament_id/table', authenticateToken, getTournamentTable);

module.exports = router;
