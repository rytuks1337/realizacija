import express from 'express';
import GroupController from '../controllers/groupController.js';

import {authenticateToken, authorizeRole} from '../middleware/authMiddleware.js';
import { createGrouptValidation } from '../validators/groupValidator.js';

const router = express.Router();


//router.get()
// GET pogrupiai by Tournament
//router.get('/:id', GroupController.getAllGroupsbyTournament);

// POST create new group
router.post('/:tournament_id/groups', authenticateToken, authorizeRole(['Organizer', 'Owner']), createGrouptValidation, GroupController.createGroupsForTournament);

// PUT update group
//router.put('/:id', authenticateToken, authorizeRole('Organizer'), pogrupis.updatePogrupiai);

// DELETE group
//router.delete('/:id', authenticateToken, authorizeRole('Organizer'), pogrupis.deletePogrupiai);

export default router;