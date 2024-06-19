const pool = require('../config/db.js');

const createMatch = async (match) => {
  const { tournament_id, round, match_num, player1_id, player2_id, winner_id, loser_id, status } = match;
  const result = await pool.query(
    'INSERT INTO Match (tournament_id, round, match_num, player1_id, player2_id, winner_id, loser_id, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [tournament_id, round, match_num, player1_id, player2_id, winner_id, loser_id, status]
  );
  return result.rows[0];
};

const getMatchesByTournament = async (tournament_id) => {
  const result = await pool.query('SELECT * FROM Match WHERE tournament_id = $1 ORDER BY round, match_num', [tournament_id]);
  return result.rows;
};

module.exports = { createMatch, getMatchesByTournament };
