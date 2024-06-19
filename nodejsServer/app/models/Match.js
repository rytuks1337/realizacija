const pool = require('../config/db.js');


// Create match
const createMatch = async (match) => {
  const { tournament_id, round, match_num, player1_id, player2_id, winner_id, loser_id, status } = match;
  const result = await pool.query(
    'INSERT INTO Match (tournament_id, round, match_num, player1_id, player2_id, winner_id, loser_id, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [tournament_id, round, match_num, player1_id, player2_id, winner_id, loser_id, status]
  );
  return result.rows[0];
};


// Get match by ID
async function getMatchById(id) {

  const result = await pool.query('SELECT * FROM Matches WHERE id = $1', [id]);
  return result.rows[0];

}

// Update match
async function updateMatch(id, { pavadinimas, data, pradzia, pabaiga, aprasas, var_pogrupiai_ID }) {
    const result = await pool.query(
      'UPDATE Matches SET pavadinimas = $1, data = $2, pradzia = $3, pabaiga = $4, aprasas = $5, var_pogrupiai_ID = $6 WHERE id = $7 RETURNING *',
      [pavadinimas, data, pradzia, pabaiga, aprasas, var_pogrupiai_ID, id]
    );
    return result.rows[0];
}

// Delete match
async function deleteMatch(id) {
    const result = await pool.query('DELETE FROM Matches WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
}

module.exports = {
  createMatch,
  getMatchById,
  updateMatch,
  deleteMatch,
};
