import express from 'express';

const router = express.Router();

import {registerUser} from '../controllers/userController.js';
import {getUserWithUUID} from '../controllers/uuidController.js';
import  {registerValidation} from '../validators/userValidator.js';
import { uuidParamValidation } from '../validators/uuidValidator.js';
import  {authenticateToken} from '../middleware/authMiddleware.js';

// Get this user
router.get('/:uuid', authenticateToken, uuidParamValidation,  getUserWithUUID);

router.post('/register', registerValidation, registerUser);

export default router;
