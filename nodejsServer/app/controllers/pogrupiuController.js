const { validationResult } = require('express-validator');
const {  addPogrupiai, updatePogrupiai, deletePogrupiai, } = require('../models/Pogrupis.js');


// Get all categories
async function getAllPogrupiai() {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM pogrupiai');
      return result.rows;
    } finally {
      client.release();
    }
  }
  
  // Get category by ID


  module.exports = { getAllPogrupiai }