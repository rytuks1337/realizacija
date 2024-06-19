const pool = require('../config/db.js');

const createUser = async (user) => {
  const { vardas, pavarde, amzius, el_pastas, slaptazodis } = user;
  const result = await pool.query(
    'INSERT INTO Vartotojas (vardas, pavarde, amzius, el_pastas, slaptazodis) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [vardas, pavarde, amzius, el_pastas, slaptazodis]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM Vartotojas WHERE el_pastas = $1', [email]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail };