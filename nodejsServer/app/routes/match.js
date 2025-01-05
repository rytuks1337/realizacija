import express from 'express';
import MatchController from '../controllers/matchController.js';
import  { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

import {matchUpdateValidation,foulAddValidation} from '../validators/matchValidator.js';

const router = express.Router();


// PUT update match
router.put('/:id', authenticateToken, authorizeRole('Judge'), matchUpdateValidation, MatchController.updateMatch);


export default router;
