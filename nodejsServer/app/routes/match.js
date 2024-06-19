const express = require('express');
const { createMatch } = require('../controllers/matchController.js');
const { matchValidation} = require('../validators/matchValidator.js');
const { authenticateToken, authorizeRole } = require('../middleware/auth.js');
const router = express.Router();

router.post('/', authenticateToken, authorizeRole('Referee'), matchValidation, createMatch);

module.exports = router;
