const express = require('express');
const { createP, getAllPlayers } = require('../controllers/playerController.js');
const { updatePlayer, deletePlayer, getPlayerById} = require('../models/Player.js')
const { playerValidation } = require('../validators/playerValidator.js');
const { authenticateToken, authorizeRole } = require('../middleware/auth.js');
const router = express.Router();


router.post('/', authenticateToken, authorizeRole('Organizer'), playerValidation, createP);
// Middleware to authenticate token for all player routes

// GET all players
router.get('/players', getAllPlayers);

// GET player by ID
router.get('/players/:id', getPlayerById);

// PUT update player
router.put('/players/:id',authenticateToken, authorizeRole('Organizer'), updatePlayer);

// DELETE player
router.delete('/players/:id',authenticateToken, authorizeRole('Organizer'), deletePlayer);

module.exports = router;