const pool = require('../config/db.js');


const getUserById = async (req, res) => {
    const id = req.user;
    try {
        const result = await pool.query('SELECT id, vardas, pavarde, amzius, el_pastas  FROM Vartotojas WHERE ID = $1', [id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {getUserById};