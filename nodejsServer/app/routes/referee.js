const express = require('express');
const { create } = require('../controllers/refereeController');
const { refereeValidation } = require('../validators/refereeValidator');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, authorizeRole('Organizer'), refereeValidation, create);

module.exports = router;
