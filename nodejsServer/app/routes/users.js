const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const pool = require('../config/db');
//Authentication
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');

// Create a new user
router.post(
    '/users/register',
    [
      body('vardas').isLength({ min: 1 }).withMessage('Name is required'),
      body('pavarde').isLength({ min: 1 }).withMessage('Surname is required'),
      body('amzius').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
      body('el_pastas').isEmail().withMessage('Invalid email format'),
      body('slaptazodis').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { vardas, pavarde, amzius, el_pastas, slaptazodis } = req.body;
      try {
        const hashedPassword = await bcrypt.hash(slaptazodis, 10);
        const result = await pool.query(
          'INSERT INTO Vartotojas (vardas, pavarde, amzius, el_pastas, slaptazodis) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [vardas, pavarde, amzius, el_pastas, hashedPassword]
        );
        res.status(201).json({ status: 'success' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  );
//login user
router.post(
    '/users/login',
    [
      body('el_pastas').isEmail().withMessage('Invalid email format'),
      body('slaptazodis').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { el_pastas, slaptazodis } = req.body;
      try {
        const result = await pool.query('SELECT * FROM Vartotojas WHERE el_pastas = $1', [el_pastas]);
        if (result.rows.length === 0) {
          return res.status(400).json({ error: 'Invalid email or password' });
        }
  
        const user = result.rows[0];
  
        bcrypt.compare(slaptazodis, user.slaptazodis, async (err, isMatch) => {
          if (err) {
            return res.status(500).json({ error: 'Internal error' });
          }
          if (isMatch) {
            const accessToken = jwt.sign(
              { id: user.id, el_pastas: user.el_pastas },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '1h' }
            );
            return res.json({ accessToken });
          } else {
            return res.status(400).json({ error: 'Invalid email or password' });
          }
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  );

// Get all users
router.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Vartotojas');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user by ID
router.get('/users/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Vartotojas WHERE ID = $1', [id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
