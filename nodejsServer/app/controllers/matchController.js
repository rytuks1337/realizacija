const { validationResult } = require('express-validator');
const { createTournament } = require('../models/Tournament');
const pool = require('../db');

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pavadinimas, data, pradzia, pabaiga, aprasas, organizatoriusVartotojo_ID, var_pogrupiai_ID } = req.body;
  try {
    const tournament = await createTournament({ pavadinimas, data, pradzia, pabaiga, aprasas, organizatoriusVartotojo_ID, var_pogrupiai_ID });
    res.status(201).json(tournament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createMatchTable = async () => {
  await pool.query(`
    CREATE TABLE Match (
      id SERIAL PRIMARY KEY,
      tournament_id INT REFERENCES Tournament(id) ON DELETE CASCADE,
      round INT NOT NULL,
      match_num INT NOT NULL,
      player1_id INT REFERENCES Player(id) ON DELETE SET NULL,
      player2_id INT REFERENCES Player(id) ON DELETE SET NULL,
      winner_id INT REFERENCES Player(id) ON DELETE SET NULL,
      loser_id INT REFERENCES Player(id) ON DELETE SET NULL,
      status VARCHAR(20) NOT NULL
    )
  `);
};

module.exports = { create, createMatchTable };