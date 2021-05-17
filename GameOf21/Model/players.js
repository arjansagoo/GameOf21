
module.exports = class Player {
    name;
    cardHand = [];
    cardTotal = 0;

    constructor(name){
        this.name = name;
        this.cardTotal = 0;
    }

}