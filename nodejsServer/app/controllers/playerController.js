const { validationResult } = require('express-validator');
const { createPlayer } = require('../models/Player.js');



const createP = async (req, res) => {

  const { vardas, pavarde, amzius, el_pastas, tournament_ID } = req.body;
  try {
    const player = await createPlayer({ vardas, pavarde, amzius, el_pastas, tournament_ID });
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAllPlayers = async (req, res) => {
    const { tournamentId } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM Zmones WHERE varzybos_ID = $1',
            [tournamentId]
        );
        res.status(200).json({ status: 'success', players: result.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 

module.exports = {createP, getAllPlayers};