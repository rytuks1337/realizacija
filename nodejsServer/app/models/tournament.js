const pool = require('../config/db.js');

const createTournament = async (tournament) => {
  const { pavadinimas, data, pradzia, pabaiga, aprasas, organizatoriusVartotojo_ID, var_pogrupiai_ID } = tournament;
  const result = await pool.query(
    'INSERT INTO Varzybos (pavadinimas, data, pradzia, pabaiga, aprasas, organizatoriusVartotojo_ID, var_pogrupiai_ID) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [pavadinimas, data, pradzia, pabaiga, aprasas, organizatoriusVartotojo_ID, var_pogrupiai_ID]
  );
  return result.rows[0];
};



module.exports = { createTournament};