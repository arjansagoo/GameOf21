module.exports = class Deck {

    deck = [];

    constructor()
        {
//      const suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
        const suits = ["♠", "♦", "♣", "♥"];
        const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

        // A for loop inside another for loop in order to create every combination in a full 52 card deck
        for(var i = 0; i < values.length; i++)
        {
            for(var x = 0; x < suits.length; x++)
            {
                var weight = parseInt(values[i]);
                if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                    weight = 10;
                if (values[i] == "A")
                    weight = 11;
                var card = { Value: values[i], Suit: suits[x], Weight: weight };
                this.deck.push(card);
            }
        }

//        console.log(this.deck);
    }

    getCardDeck(){
        return this.deck;
    }

}