const jwt = require('jsonwebtoken');
const pool = require('../config/db.js');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


const authorizeRole = (requiredRole) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.id; // Assuming the user ID is stored in req.user from JWT payload
            const tournamentId = req.params.tournamentId;

            // Fetch the user's role for the tournament
            const result = await pool.query(
                'SELECT vartotojo_tipas FROM Zmones WHERE vartotojo_ID = $1 AND varzybos_ID = $2',
                [userId, tournamentId]
            );

            if (result.rows.length === 0) {
                return res.status(403).json({ error: 'User not part of the tournament' });
            }

            const userRole = result.rows[0].vartotojo_tipas;

            if (userRole !== requiredRole) {
                return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
            }

            next();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
};

module.exports = {authenticateToken, authorizeRole};