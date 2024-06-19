const express = require('express');
const { create } = require('../controllers/playerController');
const { playerValidation } = require('../validators/playerValidator');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, authorizeRole('Organizer'), playerValidation, create);

module.exports = router;
