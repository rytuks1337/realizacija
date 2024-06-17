const Tournament = require('../models/tournament');

exports.createTournament = (req, res) => {
  const tournament = new Tournament();
  res.status(200).send('Tournament created');
};

exports.addPlayer = (req, res) => {
  const player = req.body.player;
  tournament.addPlayer(player);
  res.status(200).send(`Player ${player} added`);
};

exports.createMatch = (req, res) => {
  const player1 = req.body.player1;
  const player2 = req.body.player2;
  tournament.createMatch(player1, player2);
  res.status(200).send(`Match created between ${player1} and ${player2}`);
};

exports.updateMatch = (req, res) => {
  const matchIndex = req.body.matchIndex;
  const winner = req.body.winner;
  tournament.updateMatch(matchIndex, winner);
  res.status(200).send(`Match ${matchIndex} updated with winner ${winner}`);
};

exports.getMatches = (req, res) => {
    res.status(200).json(tournament.matches);
  };
  
  exports.getTournamentState = (req, res) => {
    // Here, you would need to implement logic to determine the current state of the tournament
    // For example, you could return the current round being played, or whether the tournament has ended
    res.status(200).json({ state: 'In progress' });
  };
  
  exports.getPlayers = (req, res) => {
    res.status(200).json(tournament.players);
  };