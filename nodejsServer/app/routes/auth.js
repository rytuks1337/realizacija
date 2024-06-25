const express = require('express');
const { body, validationResult } = require('express-validator');
const { register, login } = require('../controllers/authController.js');

const { registerValidation, loginValidation } = require('../validators/authValidator.js');
const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

module.exports = router;
