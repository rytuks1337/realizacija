import express from 'express';

const router = express.Router();

import UserController from '../controllers/userController.js';
import UuidController from '../controllers/uuidController.js';
import {registerValidation} from '../validators/userValidator.js';
import { uuidParamValidation} from '../validators/uuidValidator.js';
import {authenticateToken} from '../middleware/authMiddleware.js';

// Get this user
router.get('/:uuid', authenticateToken, uuidParamValidation,  UuidController.getUserWithUUID);

router.post('/register', registerValidation, UserController.registerUser);

export default router;
