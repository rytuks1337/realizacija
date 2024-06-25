const pool = require('../config/db.js');


// Add new pogrupis
async function addPogrupi({ pavadinimas, svoris, amzius_k, lytis, ranka,  vartotojo_ID, varzybos_ID }) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO Pogrupis (pavadinimas, svoris, amzius_k, lytis, ranka, vartotojo_ID, varzybos_ID) VALUES ($1, $2, $3, $4, $5, $6, $7 ) RETURNING *',
      [pavadinimas, svoris, amzius_k, lytis, ranka, vartotojo_ID, varzybos_ID]
    );
    return result.rows[0];
  }catch (error){
    return error;
  } finally {
    client.release();
  }
}

// Add new pogrupis
async function addPogrupiai_sar(sarasas, id_T) {
  const client = await pool.connect();
  try {
    for (let i = 0; i < sarasas.length; i++) {
     const { pavadinimas, svoris, amzius_k, lytis, ranka} = sarasas[i];
     console.log(pavadinimas, svoris, amzius_k, lytis, ranka);
      await client.query(
        'INSERT INTO Pogrupis (pavadinimas, svoris, amzius_k, lytis, ranka, varzybos_ID) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *',
        [pavadinimas, svoris, amzius_k, lytis, ranka, id_T]
      );
    }
    return "success";
  }catch (error){
    return error;
  } finally {
    client.release();
  } 
  
}

// Update pogrupis
async function updatePogrupiai({ pavadinimas, svoris, amzius_k, lytis,  vartotojo_ID, varzybos_ID }) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE Pogrupis (pavadinimas, svoris, amzius_k, lytis, ranka, vartotojo_ID, varzybos_ID) VALUES ($1, $2, $3, $4, $5, $6, $7 ) RETURNING',
      [pavadinimas, svoris, amzius_k, lytis, ranka,  vartotojo_ID, varzybos_ID]
    );
    return result.rows[0];
  }catch (error){
    return error;
  } finally {
    client.release();
  }
}
// Get pogrupis
async function getPogrupiaiById(id) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM Pogrupis WHERE id = $1', [id]);
    return result.rows[0];
  }catch (error){
    return error;
  } finally {
    client.release();
  }
}
// Delete pogrupis
async function deletePogrupiai(id) {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM Pogrupis WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }catch (error){
    return error;
  } finally {
    client.release();
  }
}

module.exports = {
  addPogrupi,
  addPogrupiai_sar,
  updatePogrupiai,
  deletePogrupiai,
  getPogrupiaiById
};
