const pool = require('../config/db.js');


// Create match
const createMatch = async (match) => {
  const { tournament_id, round, match_num, player1_id, player2_id, winner_id, loser_id, status } = match;
  const result = await pool.query(
    'INSERT INTO Match (tournament_id, round, match_num, player1_id, player2_id, winner_id, loser_id, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [tournament_id, round, match_num, player1_id, player2_id, winner_id, loser_id, status]
  );
  return result.rows[0];
};


// Get match by ID
async function getMatchById(id) {

  const result = await pool.query('SELECT * FROM Matches WHERE id = $1', [id]);
  return result.rows[0];

}

// Update match
async function updateMatch(id, { pavadinimas, data, pradzia, pabaiga, aprasas, var_pogrupiai_ID }) {
    const result = await pool.query(
      'UPDATE Matches SET pavadinimas = $1, data = $2, pradzia = $3, pabaiga = $4, aprasas = $5, var_pogrupiai_ID = $6 WHERE id = $7 RETURNING *',
      [pavadinimas, data, pradzia, pabaiga, aprasas, var_pogrupiai_ID, id]
    );
    return result.rows[0];
}

// Delete match
async function deleteMatch(id) {
    const result = await pool.query('DELETE FROM Matches WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
}

static async generateMatches (req, res) {
  const { tournament_id } = req.params;

  try {
    const players = await getAllPlayers(tournament_id);
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

module.exports = {
  createMatch,
  getMatchById,
  updateMatch,
  deleteMatch,
};
