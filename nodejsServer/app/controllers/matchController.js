


// const createMatch = async (req, res) => {

//   const { dalyvio_ID, dalyvio2_ID, laimetojoDalyvio_ID, teisejas_ID, teisejas2_ID, turnyro_ID, pogrupis_ID  } = req.body;
//   try {
//     const match = await 
//     res.status(201).json(tournament);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// class Match
// const getMatchesByTournament = async (req, res) => {
//   try {
//     var matches
//   } catch (error) {
    
//   }
//   if (!result.isEmpty()) {
//     res.status(200).json(result);
//   } else{
//     res.status(404).json({message:'Empty'});
//   }
  
// }


// const getMatchesByTournament = async (req, res) => {
//   const { tournamentId } = req.params;
//   try {
//       const result = await pool.query(
//           'SELECT * FROM Lenkimo_sesija WHERE varzybu_ID = $1',
//           [tournamentId]
//       );
//       res.status(200).json({ status: 'success', players: result.rows });
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// }; 

// module.exports = { createMatch, getMatchesByTournament, getAllMatches };