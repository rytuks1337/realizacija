import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);
        req.user = user.id;
        console.log(req.user);
        next();
    });
    
};

const generateAccessToken = async (uuid) => {
    return jwt.sign(
        { id: uuid },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );
}
const refreshToken = async (req, res) => {
    try {
        const oldtoken = req.headers['authorization'];
        if (oldtoken == null) return res.sendStatus(401);
        
        const newToken = await generateAccessToken(jwt.verify(oldtoken, process.env.ACCESS_TOKEN_SECRET).id);
        return res.json({ token: newToken });
      } catch (error) {
        res.status(401).json({ error: error.message });
      }
}

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
            return res.status(500).json({ error: error.message });
        }
    };
};

export {authenticateToken, authorizeRole, generateAccessToken, refreshToken};