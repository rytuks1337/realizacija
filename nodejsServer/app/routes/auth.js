import express from 'express';
import { login } from '../controllers/authController.js';

import { loginValidation } from '../validators/authValidator.js';
const router = express.Router();


router.post('/login', loginValidation, login);

export default router;
