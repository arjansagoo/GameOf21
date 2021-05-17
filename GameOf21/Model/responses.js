
module.exports = class Responses{
    responses = [];

    constructor(){
        this.responses.push(
            //Phase 0 responses
            {
                Shuffling: "Dealer is shuffling the deck..." ,
                Shuffled: 'The deck has been shuffled.'
            },
            //Phase 1 responses
            {
                Draw: "The dealer is now giving you two cards",
                PlayerDeal: 'The dealer has dealt you a ',
                CurrentScore: 'Your score is ',
                DealerDeal: "Dealers cards are ",
                DealerScore: "Dealer score is ",
                DealerWins: "Dealer Wins."
            },
            //Phase 2 responses
            { 
                DealersTurn: 'Dealer is taking their turn now. Good luck. ',
                DealersTotal: "The dealers total is ",
                DealerLoser: "Dealer has bust!"
            },
            //End of game responses
            { 
                Winner: "Well done, you've beat the dealer!",
                Blackjack: "You have a Blackjack!", 
                Loser: "Sorry, you have bust!",
                DealerWins: "The dealers hand is higher than yours, you lose!",
                DealerBlackjack: "Dealer has a blackjack",
                ADraw: "You have drawn with the dealer...try again",
                GameOver: "Game Over."
            }
        )
    }

    getAllResponses(){
        return this.responses;
    }

}