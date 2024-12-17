import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UuidService from '../services/uuidServices.js';
import RoleService from '../services/roleService.js';

dotenv.config();

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) return res.sendStatus(401);
        try {
            req.user = (await UuidService.getUserByUUID(user.id)).id;
        } catch (error) {
            res.status(404).json({error: "User not found"});
            return;
        }
        
        next();
    });
    
};

const testToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token.' });
        }
        return res.status(200).json({message: 'Authenticated user'})
    });
    
};

const generateAccessToken = async (uuid) => {
    return jwt.sign(
        { id: uuid },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '24h' }
    );
}
const refreshToken = async (req, res) => {
    try {
        const oldtoken = req.headers['authorization'];
        if (oldtoken == null) return res.sendStatus(401);
        
        const newToken = await generateAccessToken(jwt.verify(oldtoken, process.env.ACCESS_TOKEN_SECRET).id);
        return res.json({ authtoken: newToken });
      } catch (error) {
        res.status(401).json({ error: error.message });
      }
}

const authorizeRole = (roleArray) => {

    return async (req, res, next) => {
        try {

            const userId = req.user; // Assuming the user ID is stored in req.user from JWT payload check.
            const {tournament_id} = req.params;
            var authorizerd=false;
            // Fetch the user's role for the tournament
            const userRole = await RoleService.getRolesByUserId(tournament_id, userId);
            if (userRole.length === 0) {
                return res.status(403).json({ error: 'User not part of the tournament' });
            }
            for(var i=0;i<userRole.length;i++){
                if(roleArray.includes(userRole[i].vartotojo_tipas)){
                    authorizerd = true;
                    break;
                }
            }
            if (!authorizerd) {
                return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
            }
            
            next();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };
};

export {authenticateToken, authorizeRole, generateAccessToken, refreshToken, testToken};