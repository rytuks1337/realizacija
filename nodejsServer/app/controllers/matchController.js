import { ExtraError } from '../handlers/errorHandler.js';
import MatchService from '../services/matchService.js';


class MatchController{
    static async updateMatch(req, res){
        const { id } = req.params;
        const {winner, loser, fouls} = req.body;
        try {
          const match = await this.getMatchById(id);
          if (!match) {
            return res.status(404).json({ error: 'Match not found' });
          }
          await MatchService.updateMatch({winner,loser,fouls}, id);
          res.status(200).json({ message: 'Match updated successfully', match });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    };
}

export default MatchController;