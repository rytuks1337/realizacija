const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticateToken = require('../middleware/auth');
const { Console } = require('winston/lib/winston/transports');

// Create a new session
router.post('/sessions',authenticateToken, async (req, res) => {
  console.log(req.body);
  const { Vartotojo_ID, cre_data, exp_data } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Sesija (Vartotojo_ID, cre_data, exp_data) VALUES ($1, $2, $3) RETURNING *',
      [Vartotojo_ID, cre_data, exp_data]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all sessions
router.get('/sessions',authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Sesija');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get session by ID
router.get('/sessions/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Sesija WHERE ID = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Session not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
