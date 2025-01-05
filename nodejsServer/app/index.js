import express from 'express';
import winston from 'winston';
import tournamentRoutes from './routes/tournament.js';
import authRoutes from './routes/auth.js';
import matchRoutes from './routes/match.js';
// //const playerRoutes = require('./routes/player.js');
import refRoutes from './routes/referee.js';
import userRoutes from './routes/users.js';


// //const sessionRoutes = require('./routes/sessions.js');
import groupRoutes from './routes/group.js';
import jsonbody from './handlers/jsonHandler.js';
import errorHandler from './handlers/errorHandler.js';
// //const logAction = require('./middleware/logAction.js')
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
// app.use(logAction);
app.use(jsonbody);
app.use(errorHandler);
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); //getUser

app.use('/api/tournament', tournamentRoutes);
app.use('/api/tournament/', groupRoutes);
app.use('/api/match', matchRoutes);
//app.use('/api/player', playerRoutes);
app.use('/api/referee', refRoutes);
//app.use('/api/categories', pogrupRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  winston.info(`Server started on port ${PORT}`);
});