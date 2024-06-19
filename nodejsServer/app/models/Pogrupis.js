const pool = require('../config/db');


// Add new pogrupis
async function addPogrupiai({ pavadinimas, aprasas, organizatoriusVartotojo_ID }) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO pogrupiai (pavadinimas, aprasas, organizatoriusVartotojo_ID) VALUES ($1, $2, $3) RETURNING *',
      [pavadinimas, aprasas, organizatoriusVartotojo_ID]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

// Update pogrupis
async function updatePogrupiai(id, { pavadinimas, aprasas }) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE pogrupiai SET pavadinimas = $1, aprasas = $2 WHERE id = $3 RETURNING *',
      [pavadinimas, aprasas, id]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}
// Get pogrupis
async function getPogrupiaiById(id) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM pogrupiai WHERE id = $1', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
}
// Delete pogrupis
async function deletePogrupiai(id) {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM pogrupiai WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

module.exports = {
  addPogrupiai,
  updatePogrupiai,
  deletePogrupiai,
  getPogrupiaiById
};
