import { ExtraError } from '../handlers/errorHandler.js';
import MatchService from '../services/matchService.js';


class MatchController{
    static async updateMatch(req, res){
        const { id } = req.params;
        const {laimetojas} = req.body;
        // try {
          const match = await MatchService.getMatchById(id);
          if (!match) {
            return res.status(404).json({ error: 'Match not found' });
          }
          await MatchService.updateMatch({laimetojas}, id);
          return res.status(200).json({ message: 'Match updated successfully', match });
        // } catch (error) {
        //   if(error instanceof ExtraError){
        //     return res.status(error.statusCode).json({error: error.message})
        //   }
        //   res.status(500).json({ error: error.message });
        // }
    };
}

export default MatchController;