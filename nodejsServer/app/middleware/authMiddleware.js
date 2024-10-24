import jwt from 'jsonwebtoken';


const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token == null) return res.sendStatus(401);
    console.log(1);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user.id;
    next();
    });
};


const authorizeRole = (requiredRole) => {
    return async (req, res, next) => {
        try {
            const userId = req.user; // Assuming the user ID is stored in req.user from JWT payload
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

export {authenticateToken, authorizeRole};