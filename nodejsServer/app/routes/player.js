const express = require('express');
const { createP } = require('../controllers/playerController.js');
const { playerValidation } = require('../validators/playerValidator.js');
const { authenticateToken, authorizeRole } = require('../middleware/auth.js');
const router = express.Router();

router.post('/', authenticateToken, authorizeRole('Organizer'), playerValidation, createP);

module.exports = router;
