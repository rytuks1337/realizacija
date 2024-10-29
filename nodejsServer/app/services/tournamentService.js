import tournament from '../models/tournamentModel.js';

const newTournament = async (tournamentData) => {
  const newtournament = tournament.create(tournamentData);
  console.log(newtournament);
  return newtournament.id;
};



export { newTournament };