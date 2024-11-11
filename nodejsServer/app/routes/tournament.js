import express from 'express';

import { createTournament, generateMatches, getTournamentTable, getTournaments } from '../controllers/tournamentController.js';
import { createTournamentValidation } from '../validators/tournamentValidator.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';
const router = express.Router();

router.post('/', authenticateToken, createTournamentValidation, createTournament);
router.post('/:tournament_id/start', authenticateToken, startTournamnet);
router.post('/:tournament_id/proceed', authenticateToken, updateState);
router.get('/:tournament_id/state', authenticateToken, getState);
router.get('/tournaments-', authenticateToken, get20Tournaments);
router.post('/:tournament_id/generate', authenticateToken, authorizeRole('Organizer'), generateMatches);
router.get('/:tournament_id/table', authenticateToken, getTournamentTable);
router.get('/', getTournaments);

export default router;
