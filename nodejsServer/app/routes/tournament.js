import express from 'express';

import TournamentController from '../controllers/tournamentController.js';
import RoleController from '../controllers/roleController.js';
import { createTournamentValidation, pageParamValidation } from '../validators/tournamentValidator.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';
import { playerValidation, playerValidationEdit } from '../validators/playerValidator.js';
const router = express.Router();

router.get('/', TournamentController.get20Tournaments);

router.get('/tournaments', TournamentController.get20Tournaments); // Gauti pradinę informaciją apie pirmus 20 turnyrų.
router.get('/tournaments/:page', pageParamValidation, TournamentController.get20Tournaments); // Gauti pradinę informaciją apie 20 turnyrų pagal puslapį.
router.get('/:tournament_id', TournamentController.getTournament); // Gauti informacija apie vieną pasirinktą turnyrą.

router.post('/create', authenticateToken, createTournamentValidation, TournamentController.createTournament);// Sukurti turnyrą.

router.post('/:tournament_id/start', authenticateToken, authorizeRole(["Owner", "Organizer"]), TournamentController.startTournamnet); // Pradedamas nurodytas turnyras, privaloma turėti nurodytus leidimus.
router.put('/:tournament_id/state', authenticateToken, authorizeRole(["Owner", "Organizer"]), TournamentController.updateTournamentStatus); // Atnaujinamas turnyro statusas iki 'REGISTER', po to būtina paleisti turnyro pradžios užklausą.
router.get('/:tournament_id/state', TournamentController.getTournamentStatus); // Peržiurėti nurodyto turnyro statusa.

router.get('/:tournament_id/test', RoleController.test);
router.get('/:tournament_id/table', TournamentController.getTournamentTable); // Gražinama pasirinkto turnyro varžybinė lentelė.

// Pasirinkto turnyro rolių CRUD
router.post('/:tournament_id/role', authenticateToken, authorizeRole(["Owner", "Organizer"]), playerValidation, RoleController.createRole);
router.get('/:tournament_id/role/:id', RoleController.getRoleByUserId);
router.put('/:tournament_id/role/:id', authenticateToken, authorizeRole(["Owner", "Organizer"]),playerValidationEdit, RoleController.updateRole);
router.delete('/:tournament_id/role/:id', authenticateToken, authorizeRole(["Owner", "Organizer"]),  RoleController.deleteRole);
//


export default router;