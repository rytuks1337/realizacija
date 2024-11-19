import express from 'express';

import TournamentController from '../controllers/tournamentController.js';
import RoleController from '../controllers/roleController.js';
import { createTournamentValidation } from '../validators/tournamentValidator.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/create', authenticateToken, createTournamentValidation, TournamentController.createTournament);
//router.post('/:tournament_id/start', authenticateToken, authorizeRole('Organizer'), startTournamnet);

router.put('/:tournament_id/state', authenticateToken, TournamentController.updateTournamentState);
router.get('/:tournament_id/state', authenticateToken, TournamentController.getTournamentState);
router.get('/tournaments', TournamentController.get20Tournaments);
router.get('/:tournament_id', TournamentController.getTournament);
//router.post('/:tournament_id/generate', authenticateToken, authorizeRole('Organizer'), generateMatches);
router.get('/:tournament_id/table', authenticateToken, TournamentController.getTournamentTable);
router.post('/:tournament_id/role', RoleController.createRole);
router.get('/:tournament_id/role', RoleController.getRoleByUserId);
router.put('/:tournament_id/role', RoleController.updateRole);
router.delete('/:tournament_id/role', RoleController.deleteRole);
router.get('/', (req, res, next) => {
    res.redirect(308, '/tournaments');
 });

export default router;