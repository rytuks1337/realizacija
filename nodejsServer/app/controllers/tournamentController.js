const { validationResult } = require('express-validator');
const { createTournament, getTournamentPlayers } = require('../models/Tournament');
const { createMatch, getMatchesByTournament } = require('../models/Match');
const { shuffle } = require('../utils/shuffle');

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pavadinimas, data, pradzia, pabaiga, aprasas, var_pogrupiai_ID } = req.body;
  const organizatoriusVartotojo_ID = req.user.id;

  try {
    const tournament = await createTournament({ pavadinimas, data, pradzia, pabaiga, aprasas, organizatoriusVartotojo_ID, var_pogrupiai_ID });
    res.status(201).json(tournament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateMatches = async (req, res) => {
  const { tournament_id } = req.params;

  try {
    const players = await getTournamentPlayers(tournament_id);
    const shuffledPlayers = shuffle(players);

    // Double elimination logic
    let matches = [];
    let round = 1;
    let matchNum = 1;

    // Initial round
    for (let i = 0; i < shuffledPlayers.length; i += 2) {
      if (shuffledPlayers[i + 1]) {
        matches.push({ tournament_id, round, match_num: matchNum++, player1_id: shuffledPlayers[i].id, player2_id: shuffledPlayers[i + 1].id, status: 'scheduled' });
      } else {
        matches.push({ tournament_id, round, match_num: matchNum++, player1_id: shuffledPlayers[i].id, player2_id: null, status: 'bye' });
      }
    }

    for (const match of matches) {
      await createMatch(match);
    }

    res.status(201).json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTournamentTable = async (req, res) => {
  const { tournament_id } = req.params;

  try {
    const matches = await getMatchesByTournament(tournament_id);
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create, generateMatches, getTournamentTable };
