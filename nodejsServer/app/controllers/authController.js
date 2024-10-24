import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { findUserByEmail } from '../services/userService.js';
import { getUUID_FromUserID } from '../services/uuidServices.js';
import dotenv from 'dotenv';

dotenv.config();


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
      { id: await getUUID_FromUserID(user.id) },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { login };
