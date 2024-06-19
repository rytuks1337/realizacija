const express = require('express');
const { create, generateMatches, getTournamentTable } = require('../controllers/tournamentController');
const { tournamentValidation } = require('../validators/tournamentValidator');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, tournamentValidation, create);
router.post('/:tournament_id/generate', authenticateToken, authorizeRole('Organizer'), generateMatches);
router.get('/:tournament_id/table', authenticateToken, getTournamentTable);

module.exports = router;
