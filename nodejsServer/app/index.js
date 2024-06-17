const express = require('express');
const winston = require('winston');
const tournamentRoutes = require('./routes/tournamentRoutes');
const userRoutes = require('./routes/users');
const sessionRoutes = require('./routes/sessions');

const app = express();
app.use(express.json());

app.use('/api/tournament', tournamentRoutes);

app.use('/api', userRoutes);
app.use('/api', sessionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  winston.info(`Server started on port ${PORT}`);
  
});