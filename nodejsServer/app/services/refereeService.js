const pool = require('../config/db.js');

const createReferee = async (player) => {
  const { vardas, pavarde, amzius, el_pastas, tournament_ID } = player;
  const result = await pool.query(
    'INSERT INTO Zmones (vardas, pavarde, amzius, el_pastas, varzybos_ID, vartotojo_tipas) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [vardas, pavarde, amzius, el_pastas, tournament_ID, 'Participant']
  );
  return result.rows[0];
};

module.exports = { createReferee };
