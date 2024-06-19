const pool = require('../db');

const logAction = async (req, res, next) => {
  const { method, url, body } = req;
  const cre_data = new Date();
  const duomenys = JSON.stringify({ method, url, body });
  try {
    await pool.query('INSERT INTO Irasa_prisijungimai (cre_data, duomenys) VALUES ($1, $2)', [cre_data, duomenys]);
  } catch (error) {
    console.error('Failed to log action', error);
  }
  next();
};

module.exports = logAction;
