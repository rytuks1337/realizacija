const { validationResult } = require('express-validator');
const { createTournament } = require('../models/Tournament.js');
const pool = require('../config/db.js');

const createMatch = async (req, res) => {
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

const getAllMatches = async (req, res) => {
  const result = await pool.query('SELECT * FROM Matches');
  if (!result.isEmpty()) {
    res.status(200).json(result);
  } else{
    res.status(404).json({message:'Empty'});
  }
  
}


const getMatchesByTournament = async (req, res) => {
  const { tournamentId } = req.params;
  try {
      const result = await pool.query(
          'SELECT * FROM Lenkimo_sesija WHERE varzybu_ID = $1',
          [tournamentId]
      );
      res.status(200).json({ status: 'success', players: result.rows });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}; 

module.exports = { createMatch, getMatchesByTournament, getAllMatches };