import { ExtraError } from "../handlers/errorHandler.js";
import PlayerTable from "../models/playerTableModel.js";
import Role from "../models/roleModel.js";
import GroupService from "./groupService.js";
import MatchService from "./matchService.js";
import RefereeService from "./refereeService.js";
import RoleService from "./roleService.js";
import TableService from "./tableService.js";


class BracketService{
    static async createBracket(grupes_id, thisGroup, stageTable){
        class Match{
            constructor(dalyvio_ID1,dalyvio_ID2,laimetojoDalyvio_ID,pralaimetoDalyvio_ID){
                this.dalyvio_ID= dalyvio_ID1;
                this.dalyvio2_ID= dalyvio_ID2;
                this.laimetojoDalyvio_ID= laimetojoDalyvio_ID;
                this.pralaimetoDalyvio_ID= pralaimetoDalyvio_ID;
                return {
                    dalyvio_ID: this.dalyvio_ID,
                    dalyvio2_ID: this.dalyvio2_ID,
                    laimetojoDalyvio_ID: this.laimetojoDalyvio_ID,
                    pralaimetoDalyvio_ID: this.pralaimetoDalyvio_ID,
                    grupes_id: grupes_id,
                };
            }
        };
        var participants = await PlayerTable.findAll({
            where:{
                grupes_id: grupes_id
            }
        })
        if(!stageTable){
            throw new ExtraError("Group, tournament, or table ID not found", 404);
        }
        const rounds = { winB: [], losB: [] };
        let currentRound = [];

        for(const player of participants){
            currentRound.push(player);
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
        let round=1;
        
        if (currentRound.length > 1) {
            
            let nextRound = [];
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
                
                let match = new Match(dalyvio_ID1,dalyvio_ID2,null,null);
                
                const realMatch = await MatchService.createMatch({dalyvio_ID: match.dalyvio_ID, dalyvio2_ID: match.dalyvio2_ID , laimetojoDalyvio_ID: match.laimetojoDalyvio_ID,pralaimetoDalyvio_ID: match.pralaimetoDalyvio_ID, teisejai_ID: stageTable.teiseju_id, grupes_ID: grupes_id,roundNum: round},thisGroup);

                nextRound.push(realMatch.id);
            }


            rounds.winB.push(nextRound);
            currentRound = nextRound;
            round=round+1;
            
        }
        while(currentRound.length > 1){
            let nextRound = [];
            let ammount = currentRound.length-1;
            for (let i = 0; i < ammount; i += 2) {
                
                //let match = new Match(null,null,null,null);
                
                const realMatch = await MatchService.createMatch({dalyvio_ID: null, dalyvio2_ID: null , laimetojoDalyvio_ID:null,pralaimetoDalyvio_ID: null, teisejai_ID: stageTable.teiseju_id, grupes_ID: grupes_id,roundNum: round},thisGroup);

                nextRound.push(realMatch.id);
            }


            rounds.winB.push(nextRound);
            currentRound = nextRound;
            round=round+1;

        }
        if (currentRound.length >= 1) {
            for(let i=0;i<2;i++){//add 2 extra rounds for finals and finals rematch
                let nextRound = [];
                const realMatch = await MatchService.createMatch({dalyvio_ID: null, dalyvio2_ID: null , laimetojoDalyvio_ID:null,pralaimetoDalyvio_ID: null, teisejai_ID: stageTable.teiseju_id, grupes_ID: grupes_id,roundNum: round},thisGroup);
                nextRound.push(realMatch.id);
                rounds.winB.push(nextRound);
            }
        }


        round = 1;
        for (let a = 0; a<calculateLosersRounds(nextPowerOfTwo); a++) {//Ammount of rounds in losers bracket
            let nextRound = [];
            for (let i = 0; i < nextPowerOfTwo/(4*(Math.pow(2,Math.floor(a/2)))); i++) {//In case of 16 players, this will create 4 matches for first two rounds, 2 matches for third and fourth rounds, 1 match for fifth and sixth rounds.

                //let match = new Match(null, null, null, null);

                const realMatch = await MatchService.createMatch(
                    {
                        dalyvio_ID: null,
                        dalyvio2_ID: null,
                        laimetojoDalyvio_ID: null,
                        pralaimetoDalyvio_ID: null,
                        teisejai_ID: stageTable.teiseju_id,
                        grupes_ID: grupes_id,
                        roundNum: round,
                    },
                    thisGroup
                );

                nextRound.push(realMatch.id);
            }

            rounds.losB.push(nextRound);
            round += 1;
        }

        return rounds;

    }

    static async initBracketsForTournament(tournament_id){
        const groups = await GroupService.getDistributedGroupsOfTournament(tournament_id); // Get ordered and distributed groups
        let nrOfTable=0;
        for(const table of groups){ // The same ammount of group arrays as physical tables.
            let stageTable = await TableService.getTableByNr(tournament_id,nrOfTable);
            for (let index = 0; index < table.length; index++){
                for (let indexj = 0; indexj < table[index].length; indexj++) { // For every singular group group
                    let thisGroup = await GroupService.getGroupByID(table[index][indexj]);
                    let bracket = await this.createBracket(table[index][indexj],thisGroup,stageTable); // Create bracket
                    await GroupService.addMatch(thisGroup,bracket);
                    await GroupService.updatePogrupiai(thisGroup,{bracket: bracket});
                    if(bracket.winB.length===0){
                        await TableService.addGroup(stageTable,thisGroup,table[index][indexj]);
                    }
                    await this.updateRound(thisGroup);
                }
            }
            nrOfTable = nrOfTable+1;
        }
    }
    static async updateRound(group){
        let bracket = await this.generateBracketObj(group);
        let current_round=group.raundas;
        let notChanged=true;
        if((bracket.winB.length || undefined)===undefined){
            return;
        }
        while(notChanged){
            notChanged=false;
            if(current_round!==bracket.winB.length-2){
                for(let i = 0; i<bracket.winB[current_round].length;i++){
                    if(current_round===0){// on first round update byes, losing round byes also.
                        
                        if((bracket.winB[current_round][i].dalyvio_ID && !bracket.winB[current_round][i].dalyvio2_ID) && !bracket.winB[current_round][i].laimetojoDalyvio_ID){
                            bracket.winB[current_round][i].laimetojoDalyvio_ID = bracket.winB[current_round][i].dalyvio_ID;
                            notChanged=true;
        
                        }else if((!bracket.winB[current_round][i].dalyvio_ID && bracket.winB[current_round][i].dalyvio2_ID) && !bracket.winB[current_round][i].laimetojoDalyvio_ID){
                            bracket.winB[current_round][i].laimetojoDalyvio_ID = bracket.winB[current_round][i].dalyvio2_ID;
                            notChanged=true;
                        }
                        // if(i%2===0 &&bracket.winB.length>1){
                        //     console.log("IDO:",bracket.winB[current_round][i].laimetojoDalyvio_ID)
                        //     console.log("IDO2:",bracket.winB[current_round][i+1].laimetojoDalyvio_ID)
   
                        //     if(!bracket.losB[current_round][Math.floor(i/2)].laimetojoDalyvio_ID && (bracket.winB[current_round][i].laimetojoDalyvio_ID && bracket.winB[current_round][i+1].laimetojoDalyvio_ID)){// Check if the winner bracket rounds for this losers bracket match is done fully, then update 
                        //         console.log("ID:",bracket.winB[current_round][i].id,bracket.winB[current_round][i].laimetojoDalyvio_ID)
                        //         console.log("ID2:",bracket.winB[current_round][i+1].id,bracket.winB[current_round][i+1].laimetojoDalyvio_ID)
                        //         console.log(bracket.losB[current_round][Math.floor(i/2)].laimetojoDalyvio_ID);
                        //         if(bracket.losB[current_round][Math.floor(i/2)].dalyvio_ID){
                        //             bracket.losB[current_round][Math.floor(i/2)].laimetojoDalyvio_ID = bracket.losB[current_round][Math.floor(i/2)].dalyvio_ID;
                        //             console.log("me")
                        //         }else{
                        //             bracket.losB[current_round][Math.floor(i/2)].laimetojoDalyvio_ID = bracket.losB[current_round][Math.floor(i/2)].dalyvio2_ID;
                        //             console.log("NOme")
                        //         }
            
                        //         notChanged=true;
                        //         console.log("infiniteR0") 
                        //     }
                        // }
                    }
                    
                    //update winner bracket that the winner to continue to the next rounds, and send loser to losers bracket
                    if(bracket.winB[current_round][i].laimetojoDalyvio_ID && (((!bracket.winB[current_round+1][Math.floor(i/(2+(current_round%2)*2))].dalyvio_ID && !bracket.winB[current_round+1][Math.floor(i/(2+(current_round%2)*2))].dalyvio2_ID) && current_round) || (((!bracket.winB[current_round+1][Math.floor(i/(2+(current_round%2)*2))].dalyvio_ID && bracket.winB[current_round+1][Math.floor(i/(2+(current_round%2)*2))].dalyvio2_ID) || (bracket.winB[current_round+1][Math.floor(i/(2+(current_round%2)*2))].dalyvio_ID && !bracket.winB[current_round+1][Math.floor(i/(2+(current_round%2)*2))].dalyvio2_ID)) && !current_round))){
                        notChanged=true;
                        if(i%2===0){
                            bracket.winB[current_round+1][Math.floor(i/2)].dalyvio_ID=bracket.winB[current_round][i].laimetojoDalyvio_ID;
                            
                        }else{
                            bracket.winB[current_round+1][Math.floor(i/2)].dalyvio2_ID=bracket.winB[current_round][i].laimetojoDalyvio_ID;
                        }
                        if(current_round===0){
                            if(i%2===0){
                                bracket.losB[current_round][Math.floor(i/2)].dalyvio_ID=bracket.winB[current_round][i].pralaimetoDalyvio_ID;
                            }else{
                                bracket.losB[current_round][Math.floor(i/2)].dalyvio2_ID=bracket.winB[current_round][i].pralaimetoDalyvio_ID;
                            }
                            
                        }else{
                            bracket.losB[current_round*2-1][Math.floor(i/2)].dalyvio_ID=bracket.winB[current_round][i].pralaimetoDalyvio_ID;
                        }
        
                        
                    }
        
                    if(current_round%2===0){// On start and skipping every other round
        
                        //update loosers bracket
                        if(bracket.losB[current_round][Math.floor(i/2)].laimetojoDalyvio_ID && !bracket.losB[current_round+1][Math.floor(i/2)].dalyvio2_ID){ // Move winner of looser round to the next round
                            notChanged=true;
                            bracket.losB[current_round+1][Math.floor(i/2)].dalyvio2_ID=bracket.losB[current_round][Math.floor(i/2)].laimetojoDalyvio_ID;
                        }
        
                    }else{ // every other round.
                        //update loosers bracket
                        
                        if(bracket.losB[current_round][Math.floor(i/2)].laimetojoDalyvio_ID && (!bracket.losB[current_round+1][Math.floor(i/4)].dalyvio_ID || !bracket.losB[current_round+1][Math.floor(i/4)].dalyvio2_ID)){
                            notChanged=true;
                            if(i%4===1){
                                bracket.losB[current_round+1][Math.floor(i/4)].dalyvio_ID=bracket.losB[current_round][Math.floor(i/2)].laimetojoDalyvio_ID;
                            }else{
                                bracket.losB[current_round+1][Math.floor(i/4)].dalyvio2_ID=bracket.losB[current_round][Math.floor(i/2)].laimetojoDalyvio_ID;
                            }
                        }
                        
                    }
                }
            }
            if(bracket.winB[current_round][bracket.winB[current_round].length-1].laimetojoDalyvio_ID && bracket.losB[current_round][bracket.losB[current_round].length-1].laimetojoDalyvio_ID){
                current_round = current_round+1;
                notChanged=true;
            }
        }
        group.raundas=current_round;
        for(let i=0; i<bracket.winB.length; i++){
            for(let j=0; j<bracket.winB[i].length; j++){
                if(bracket.winB[i][j].changed()){
                    await bracket.winB[i][j].save();
                }
                bracket.winB[i][j] = bracket.winB[i][j].id;
            }
        }
        for(let i=0; i<bracket.losB.length; i++){
            for(let j=0; j<bracket.losB[i].length; j++){
                if(bracket.losB[i][j].changed()){
                    await bracket.losB[i][j].save();
                }
                bracket.losB[i][j] =  bracket.losB[i][j].id
            }
        }
        await group.save();
        await group.update({bracket: bracket});



    }
    static async generateBracketObj(group){
        let bracketOfId = group.bracket;
        const groupsMatches = await MatchService.generateMatchesForBrackets(group.id);
        for(let i=0; i<bracketOfId.winB.length; i++){
            for(let j=0; j<bracketOfId.winB[i].length; j++){
                bracketOfId.winB[i][j] = getMatchFromArray(groupsMatches, bracketOfId.winB[i][j]);
            }
        }
        for(let i=0; i<bracketOfId.losB.length; i++){
            for(let j=0; j<bracketOfId.losB[i].length; j++){
                bracketOfId.losB[i][j] = getMatchFromArray(groupsMatches, bracketOfId.losB[i][j]);
            }
        }
        return bracketOfId;
    }
    static async generateBracketObjNames(group){
        let bracketOfId = group.bracket;
        const groupsMatches = await MatchService.generateMatchesForBrackets(group.id);
        for(let i=0; i<bracketOfId.winB.length; i++){
            for(let j=0; j<bracketOfId.winB[i].length; j++){
                bracketOfId.winB[i][j] = getMatchFromArray(groupsMatches, bracketOfId.winB[i][j]);
                bracketOfId.winB[i][j] = bracketOfId.winB[i][j].dataValues;
                if(bracketOfId.winB[i][j].dalyvio_ID){
                    let tempplayer = await PlayerTable.findByPk(bracketOfId.winB[i][j].dalyvio_ID);
                    if(tempplayer && tempplayer.roles_ID){
                        let tempRole = await Role.findByPk(tempplayer.roles_ID);
                        bracketOfId.winB[i][j].dalyvioN = tempRole.vardas+ " " + tempRole.pavarde;
                    }
                }
                if(bracketOfId.winB[i][j].dalyvio2_ID){
                    let tempplayer = await  PlayerTable.findByPk(bracketOfId.winB[i][j].dalyvio2_ID);
                    if(tempplayer && tempplayer.roles_ID){
                        let tempRole = await Role.findByPk(tempplayer.roles_ID);
                        bracketOfId.winB[i][j].dalyvio2N = tempRole.vardas+ " " + tempRole.pavarde;
                    }
                }
            }
        }
        for(let i=0; i<bracketOfId.losB.length; i++){
            for(let j=0; j<bracketOfId.losB[i].length; j++){
                bracketOfId.losB[i][j] = getMatchFromArray(groupsMatches, bracketOfId.losB[i][j]);
                bracketOfId.losB[i][j] = bracketOfId.losB[i][j].dataValues;
                if(bracketOfId.losB[i][j].dalyvio_ID){
                    let tempplayer = await  PlayerTable.findByPk(bracketOfId.losB[i][j].dalyvio_ID);
                    if(tempplayer && tempplayer.roles_ID){
                        let tempRole = await Role.findByPk(tempplayer.roles_ID);
                        if(tempRole){
                            bracketOfId.losB[i][j].dalyvioN = tempRole.vardas+ " " + tempRole.pavarde;
                        }
                    }
                }
                if(bracketOfId.losB[i][j].dalyvio2_ID){
                    let tempplayer = await  PlayerTable.findByPk(bracketOfId.losB[i][j].dalyvio2_ID);
                    if(tempplayer && tempplayer.roles_ID){
                        let tempRole = await Role.findByPk(tempplayer.roles_ID);
                        if(tempRole){
                            bracketOfId.losB[i][j].dalyvio2N = tempRole.vardas+ " " + tempRole.pavarde;
                        }
                    }
                }
            }
        }
        return bracketOfId;
    }
}

function calculateLosersRounds(nextPowerOfTwo) {
    if (nextPowerOfTwo === 2) {
        return 1; // Special case: 2 players mean 1 round in losers' bracket
    }
    return (Math.log2(nextPowerOfTwo) - 1) * 2;
}
function getMatchFromArray(groupsMatches, idOfMatch){
    return groupsMatches.find(match => match.id === idOfMatch);
}
export default BracketService;