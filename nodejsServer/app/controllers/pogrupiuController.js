const { validationResult } = require('express-validator');
const {  addPogrupi, addPogrupiai_sar, updatePogrupiai, deletePogrupiai } = require('../models/Pogrupis.js');
const pool = require('../config/db.js');



async function getAllPogrupiaibyTournament(id) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM Pogrupis Where varzybos_ID = $1',[id]);
    return result.rows[0];
  }catch (error){
    return error;
  } finally {
    client.release();
  }
}
async function getAllPogrupiaibyPlayerOfTournament(id_T, id_P) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM Pogrupis Where vartotojo_ID = $1 AND varzybos_ID = $2',[id_P, id_T]);
    return result.rows[0];
  }catch (error){
    return error;
  } finally {
    client.release();
  }
}

async function createPogrupisForTournament(sarasas, id_T){
  const client = await pool.connect();
  try {
    const pogrupis = await addPogrupiai_sar(sarasas, id_T);
    return pogrupis;
  }catch (error){
    return error;
  } finally {
    client.release();
  }
}
async function createPogrupisForPlayer(){
  
}

  
  // Get category by ID


  module.exports = {getAllPogrupiaibyTournament,getAllPogrupiaibyPlayerOfTournament,createPogrupisForTournament,createPogrupisForPlayer }