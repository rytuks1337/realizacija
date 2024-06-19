const express = require('express');
const { createRef } = require('../controllers/refereeController.js');
const { refereeValidation } = require('../validators/refereeValidator.js');
const { authenticateToken, authorizeRole } = require('../middleware/auth.js');
const router = express.Router();

router.post('/', authenticateToken, authorizeRole('Organizer'), refereeValidation, createRef);

module.exports = router;
