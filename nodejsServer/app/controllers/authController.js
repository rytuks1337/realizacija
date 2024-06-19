const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { createUser, findUserByEmail } = require('../models/User.js');
require('dotenv').config();

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { vardas, pavarde, amzius, el_pastas, slaptazodis } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(slaptazodis, 10);
    const user = await createUser({ vardas, pavarde, amzius, el_pastas, slaptazodis: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { el_pastas, slaptazodis } = req.body;
  try {
    const user = await findUserByEmail(el_pastas);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(slaptazodis, user.slaptazodis);
    if (!match) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const accessToken = jwt.sign(
      { id: user.id, el_pastas: user.el_pastas, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
