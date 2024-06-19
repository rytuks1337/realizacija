const pool = require('../config/db.js');

// Create a new player
async function createPlayer({ vardas, pavarde, amzius, el_pastas, tournament_ID }) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO Zmones (vardas, pavarde, amzius, el_pastas, varzybos_ID, vartotojo_tipas) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [vardas, pavarde, amzius, el_pastas, tournament_ID, 'Participant']
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

// Update player
async function updatePlayer(id, { vardas, pavarde, amzius, el_pastas, tournament_ID }) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE Zmones SET vardas = $1, pavarde = $2, amzius = $3, el_pastas = $4, varzybos_ID = $5 WHERE id = $6 RETURNING *',
      [vardas, pavarde, amzius, el_pastas, tournament_ID, id]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

// Delete player
async function deletePlayer(id) {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM Zmones WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
}
// Get player
async function getPlayerById(id) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM Zmones WHERE id = $1', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

module.exports = {
  createPlayer,
  updatePlayer,
  deletePlayer,
  getPlayerById
};
