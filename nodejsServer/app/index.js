import express from 'express';
import winston from 'winston';
// //const tournamentRoutes = require('./routes/tournament.js');
import authRoutes from './routes/auth.js';
// //const matchRoutes = require('./routes/match.js');
// //const playerRoutes = require('./routes/player.js');
// //const refRoutes = require('./routes/referee.js');
import userRoutes from './routes/users.js';
// //const sessionRoutes = require('./routes/sessions.js');
// //const pogrupRoutes = require('./routes/pogrupiai.js')
// //const logAction = require('./middleware/logAction.js')

const app = express();
app.use(express.json());
// app.use(logAction);


app.use('/api/auth', authRoutes); //finished? rolelogic
app.use('/api/user', userRoutes); //getUser

//app.use('/api/tournament', tournamentRoutes);
//app.use('/api/match', matchRoutes);
//app.use('/api/player', playerRoutes);
//app.use('/api/referee', refRoutes);
//app.use('/api/categories', pogrupRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  winston.info(`Server started on port ${PORT}`);
});