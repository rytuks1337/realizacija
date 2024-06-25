const express = require('express');
const router = express.Router();
const pogrupiaiController = require('../controllers/pogrupiuController.js');
const pogrupis = require('../models/Pogrupis.js');
const {authenticateToken, authorizeRole} = require('../middleware/auth.js');



// GET pogrupiai by ID
router.get('/pogrupiai/:id', pogrupis.getPogrupiaiById);

// POST create new pogrupiai
router.post('/pogrupiai', authenticateToken, pogrupis.addPogrupi); //, authorizeRole('Organizer')

// PUT update pogrupiai
router.put('/pogrupiai/:id', authenticateToken, authorizeRole('Organizer'), pogrupis.updatePogrupiai);

// DELETE pogrupiai
router.delete('/pogrupiai/:id', authenticateToken, authorizeRole('Organizer'), pogrupis.deletePogrupiai);

module.exports = router;