CardDeck = require('../Model/deck');

module.exports = class DealerService{
    cardDeck = new CardDeck();

    deckOfCards = this.cardDeck.getCardDeck();

    shuffleDeck(){
        for (var i = 0; i < this.deckOfCards.length; i++){
            let location1 = Math.floor((Math.random() * this.deckOfCards.length));
            let location2 = Math.floor((Math.random() * this.deckOfCards.length));
            let temp = this.deckOfCards[location1];

            this.deckOfCards[location1] = this.deckOfCards[location2];
            this.deckOfCards[location2] = temp;
        }
    }

    cardHit(){
        let selectedCard = this.deckOfCards.shift();
        return selectedCard;
    }

}