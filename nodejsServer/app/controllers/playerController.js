const { validationResult } = require('express-validator');
const { createPlayer } = require('../models/Player');

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { vardas, pavarde, amzius, el_pastas, tournament_ID } = req.body;
  try {
    const player = await createPlayer({ vardas, pavarde, amzius, el_pastas, tournament_ID });
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create };
