const pool = require('../config/db.js');

const createTournament = async (tournament) => {
  const { pavadinimas, data,stalu_sk, lokacija, pradzia, pabaiga, aprasas, organizatoriusVartotojo_ID } = tournament;
  const result = await pool.query(
    'INSERT INTO varzybos (pavadinimas, data, stalu_sk, lokacija, pradzia, pabaiga, aprasas, organizatoriusVartotojo_ID) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [pavadinimas, data, stalu_sk, lokacija, pradzia, pabaiga, aprasas, organizatoriusVartotojo_ID]
  );
  return result.rows[0];
};



module.exports = { createTournament};