class Tournament {
    constructor(name, description, date, arm_start) {
        this.name = null;
        this.description = null;

        this.players = [];
        this.matches = [];
        this.referee = [];
    }

    addPlayer(player) {
        this.players.push(player);
    }

    createMatch(player1, player2, referee) {
        this.matches.push({ player1, player2, referee, winner: null });
    }

    updateMatch(reason, matchIndex, player) {
        switch(reason){
            case "Winner":
                if (this.matches[matchIndex].winner === null) {
                    this.matches[matchIndex].winner = winner;
                } else {
                    throw new Error(`Match ${matchIndex} already has a winner.`);
                }
                break;
            case "Straps":
                
        }
       
    }
    updateMatchForce(){

    }
}
  
module.exports = Tournament;