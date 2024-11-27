import { ExtraError } from "../handlers/errorHandler.js";
import PlayerTable from "../models/playerTableModel.js";
import GroupService from "./groupService.js";
import MatchService from "./matchService.js";
import RefereeService from "./refereeService.js";
import RoleService from "./roleService.js";
import TableService from "./tableService.js";


class BracketService{
    static async createBracket(grupes_id, nr){
        var participants = await PlayerTable.findAll({
            where:{
                grupes_id: grupes_id
            }
        })
        const thisGroup = await GroupService.getGroupByID(grupes_id);
        const stageTable = await TableService.getTableByNr(thisGroup.turnyro_ID,nr);
        if(stageTable.length===0){
            throw new ExtraError("Group, tournament, or table ID not found", 404);
        }
        var rounds = {};
        rounds.winB=[];
        rounds.losB=[];
        let currentRound = [];
        for(const player of participants){
            currentRound.push(player.dataValues);
        }
        const nextPowerOfTwo = Math.pow(2, Math.ceil(Math.log2(currentRound.length)));// gets closest bigger number of 2,4,8,16 etc.
        const numOfByes = nextPowerOfTwo - currentRound.length;


        for (let i = 1; i <= numOfByes; i++) {
            if(i%2===1){
                currentRound.splice((2*Math.ceil(i/2)-1), 0, null);

            }else{
                currentRound.splice(currentRound.length+(-2*(Math.ceil(i/2)-1)), 0, null);
            }
        }
        
        while (currentRound.length > 1) {
            const nextRound = [];
            for (let i = 0; i < currentRound.length; i += 2) {
                let dalyvio_ID1, dalyvio_ID2;

                if(currentRound[i]!==null && currentRound[i]!==undefined){
                    dalyvio_ID1=currentRound[i].id    
                }else{
                    dalyvio_ID2=null;
                }

                if(currentRound[i+1]!==null && currentRound[i+1]!==undefined){
                    dalyvio_ID2=currentRound[i+1].id;

                }else{
                    dalyvio_ID2=null;

                }
                
                let match = {
                    dalyvio_ID: dalyvio_ID1,
                    dalyvio2_ID: dalyvio_ID2,
                    laimetojoDalyvio_ID: null,
                    pralaimetoDalyvio_ID: null,
                    grupes_id: grupes_id,
                };
                
                if (dalyvio_ID1 && !dalyvio_ID2) { // When dalyvis2 is null
                    match.laimetojoDalyvio_ID = dalyvio_ID1;
                    match.pralaimetoDalyvio_ID = dalyvio_ID2;
                }
                const realMatch = await MatchService.createMatch({dalyvio_ID: match.dalyvio_ID, dalyvio2_ID: match.dalyvio2_ID , laimetojoDalyvio_ID: match.laimetojoDalyvio_ID,pralaimetoDalyvio_ID: match.pralaimetoDalyvio_ID, teisejai_ID: stageTable[0].teiseju_id, grupes_ID: grupes_id},stageTable[0].id);
                nextRound.push(match);
                
            }
            throw new ExtraError("Forced", 404);
            rounds.winB.push(nextRound);

            currentRound = nextRound.map(match => {
                if (match.laimetojoDalyvio_ID) {
                    // Automatically advance winners of bye matches
                    return { id: match.laimetojoDalyvio_ID };
                }
                return null; // Placeholder for undecided matches
            }); // Prepare slots for the next round
        }
        
        return rounds;

    }

    static async initBracketsForTournament(tournament_id){
        const groups = await GroupService.getDistributedGroupsOfTournament(tournament_id); // Get ordered and distributed groups
        const tables = await TableService.getAllTablesOfTournament(tournament_id); // Get all tables that this tournament has
        let nrOfTable=0;
        for(const table of groups){ // for all group collections
            
            for (let index = 0; index < table.length; index++){
                console.log(table[index]);
                for (let indexj = 0; indexj < table[index].length; indexj++) { // For every singular group group
                    const bracket = await this.createBracket(table[index][indexj],nrOfTable); // Create bracket
                    await GroupService.updatePogrupiai(table[index][indexj],{bracket: bracket});
                    
                }

                
            }
            nrOfTable = nrOfTable+1;
        }
    }

}
export default BracketService;