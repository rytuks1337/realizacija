import express from 'express';
import { login } from '../controllers/authController.js';
import  { authenticateToken, refreshToken, testToken } from '../middleware/authMiddleware.js';

import { loginValidation } from '../validators/authValidator.js';
const router = express.Router();


router.post('/login', loginValidation, login);

router.post('/retoken', authenticateToken, refreshToken);

router.get('/test', testToken);

export default router;
