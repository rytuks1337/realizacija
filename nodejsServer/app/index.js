const express = require('express');
const winston = require('winston');
const tournamentRoutes = require('./routes/tournament.js');
const authRoutes = require('./routes/auth.js');
const matchRoutes = require('./routes/match.js');
const playerRoutes = require('./routes/player.js');
const refRoutes = require('./routes/referee.js');
const sessionRoutes = require('./routes/sessions.js');
const logAction = require('./middleware/logAction.js')

const app = express();
app.use(express.json());
app.use(logAction);


app.use('/api/users', authRoutes);
app.use('/api/tournament', tournamentRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/referee', refRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  winston.info(`Server started on port ${PORT}`);
});