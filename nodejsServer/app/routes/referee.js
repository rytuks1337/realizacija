import express from 'express';
import MatchController from '../controllers/matchController.js';
import  {authenticateToken, authorizeRole} from '../middleware/authMiddleware.js';
const router = express.Router();


router.put('/match/:id', authenticateToken, authorizeRole('Judge'), MatchController.updateMatch);



export default router;