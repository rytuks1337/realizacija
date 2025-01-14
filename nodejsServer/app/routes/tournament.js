import express from 'express';

import TournamentController from '../controllers/tournamentController.js';
import RoleController from '../controllers/roleController.js';
import { createTournamentValidation, pageParamValidation, searchValidation } from '../validators/tournamentValidator.js';
import { authenticateToken, authorizeRole, checkToken } from '../middleware/authMiddleware.js';
import { playerValidation, playerValidationEdit } from '../validators/playerValidator.js';
import MatchController from '../controllers/matchController.js';
import {matchUpdateValidation,foulAddValidation} from '../validators/matchValidator.js';
import storage from '../config/upload.js';
import multer from 'multer';
const router = express.Router();
const upload = multer({storage});


router.get('/tournaments/:page', checkToken, pageParamValidation, searchValidation, TournamentController.get20Tournaments); // Gauti pradinę informaciją apie 20 turnyrų pagal puslapį ir nustatymus
router.get('/:tournament_id', TournamentController.getTournament); // Gauti informacija apie vieną pasirinktą turnyrą.

router.post('/create', authenticateToken, upload.single('file'), processFile, createTournamentValidation, TournamentController.createTournament);// Sukurti turnyrą.

router.post('/:tournament_id/start', authenticateToken, authorizeRole(["Owner", "Organizer"]), TournamentController.startTournamnet); // Pradedamas nurodytas turnyras, privaloma turėti nurodytus leidimus.
router.put('/:tournament_id/state', authenticateToken, authorizeRole(["Owner", "Organizer"]), TournamentController.updateTournamentStatus); // Atnaujinamas turnyro statusas iki 'REGISTER', po to būtina paleisti turnyro pradžios užklausą.
router.get('/:tournament_id/state', TournamentController.getTournamentStatus); // Peržiurėti nurodyto turnyro statusa.

router.get('/:tournament_id/test', RoleController.test);
router.get('/:group_id/table', TournamentController.getTournamentTable); // Get tournament table of a specific group

router.get('/:tournament_id/tables', TournamentController.getTournamentQueueTables)

// Pasirinkto turnyro rolių CRUD
router.post('/:tournament_id/role', authenticateToken, authorizeRole(["Owner", "Organizer"]), playerValidation, RoleController.createRole);
router.get('/:tournament_id/role',authenticateToken, RoleController.getRoleByUserId);
router.put('/:tournament_id/role/:id', authenticateToken, authorizeRole(["Owner", "Organizer"]),playerValidationEdit, RoleController.updateRole);
router.delete('/:tournament_id/role/:id', authenticateToken, authorizeRole(["Owner", "Organizer"]),  RoleController.deleteRole);


// PUT update match
router.put('/:tournament_id/match/:id', authenticateToken, authorizeRole('Judge'), matchUpdateValidation, MatchController.updateMatch);
//

async function processFile(req, res, next){
  try {
      // Parse JSON form data.
      req.filepath=`uploads/${req.file.filename}`;
      // Pass on the data as body.
      req.body = JSON.parse(req.body.data);
      next();
    } catch (error) {
      res.status(400).json({ error: 'Invalid JSON format in "data" field.' });
    }
}


export default router;