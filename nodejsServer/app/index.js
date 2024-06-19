const express = require('express');
const winston = require('winston');
const tournamentRoutes = require('./routes/tournament');
const userRoutes = require('./routes/users');
const sessionRoutes = require('./routes/sessions');

const app = express();
app.use(express.json());
app.use(logAction);


app.use('/users', authRoutes);
app.use('/tournament', tournamentRoutes);
app.use('/match', matchRoutes);
app.use('/player', playerRoutes);
app.use('/referee', refereeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  winston.info(`Server started on port ${PORT}`);

});