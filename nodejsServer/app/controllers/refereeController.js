const { validationResult } = require('express-validator');
const { createReferee } = require('../models/Referee.js');
const pool = require('../config/db.js');

const createRef = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { vartotojo_ID, tournament_ID } = req.body;
  try {
    const referee = await createReferee({ vartotojo_ID, tournament_ID });
    res.status(201).json(referee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { createRef };
