const express = require('express');
const { create, logAction } = require('../controllers/matchController');
const { matchValidation, logActionValidation } = require('../validators/matchValidator');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, authorizeRole('Referee'), matchValidation, create);
router.post('/log', authenticateToken, authorizeRole('Referee'), logActionValidation, logAction);

module.exports = router;
