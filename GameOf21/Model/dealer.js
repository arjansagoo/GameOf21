module.exports = class Dealer {
    name;
    cardHand = [];
    cardTotal;

    constructor(){
        this.name = "Dealer";
        this.cardTotal = 0;
    }
}