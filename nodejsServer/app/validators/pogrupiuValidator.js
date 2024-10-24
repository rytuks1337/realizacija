const pool = require('../config/db.js');

async function validateVarPogrupiaiID(req, res, next) {
  const { var_pogrupiai_ID } = req.body;
  const userId = req.user.id;

  try {
    // Ar egzistuoja šie pogrupiai?
    const result = await pool.query('SELECT * FROM var_pogrupiai WHERE id = $1', [var_pogrupiai_ID]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Neegzstuoja šios kategorijos' });
    }

    // Check if var_pogrupiai_ID belongs to the authenticated user
    const pogrupiai = result.rows[0];
    if (pogrupiai.organizatoriusVartotojo_ID !== userId) {
      return res.status(403).json({ error: 'var_pogrupiai_ID does not belong to the authenticated user' });
    }

    // If validation passes, proceed to the next middleware
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { validateVarPogrupiaiID };
