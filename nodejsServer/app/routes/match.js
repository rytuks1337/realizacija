const express = require('express');
const matchesController = require('../controllers/matchController.js');
const classMatch = require('../models/Match.js')
const { matchValidation} = require('../validators/matchValidator.js');
const { authenticateToken, authorizeRole } = require('../middleware/auth.js');
const router = express.Router();

router.post('/', authenticateToken, authorizeRole('Referee'), matchValidation, matchesController.createMatch);

router.get('/matches', matchesController.getAllMatches);

// GET match by ID
router.get('/matches/:id', classMatch.getMatchById);

// PUT update match
router.put('/matches/:id',authenticateToken, authorizeRole('Referee'), classMatch.updateMatch);

// DELETE match
router.delete('/matches/:id',authenticateToken, authorizeRole('Referee'), classMatch.deleteMatch);

module.exports = router;
