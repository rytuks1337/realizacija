const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const {getUserById} = require('../controllers/userController.js')

const {authenticateToken} = require('../middleware/auth.js');

// Get this user
router.get('/', authenticateToken, getUserById);


module.exports = router;
