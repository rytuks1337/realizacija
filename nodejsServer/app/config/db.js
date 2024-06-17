const { Pool } = require('pg');

const pool = new Pool({
  user: 'administrator',
  host: 'postgresql', // Replace with your PostgreSQL server address
  database: 'tournaments_db',
  password: 'E#Lyvsyf4dtnCkV^r9PEn4',
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;