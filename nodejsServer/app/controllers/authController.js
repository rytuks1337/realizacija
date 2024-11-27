import bcrypt from 'bcryptjs';

import { validationResult } from 'express-validator';
import UserService from '../services/userService.js';
import UuidService from '../services/uuidServices.js';
import { generateAccessToken } from '../middleware/authMiddleware.js';



const login = async (req, res) => {

  const { el_pastas, slaptazodis } = req.body;

  try {
    const user = await UserService.findUserByEmail(el_pastas);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(slaptazodis, user.slaptazodis);
    if (!match) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const accessToken = await generateAccessToken(await UuidService.getUUID_FromUserID(user.id));

    return res.json({ accessToken });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { login };
