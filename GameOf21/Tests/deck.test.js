const { test } = require('@jest/globals');
const testDeck = require('../Model/deck.js');

let cardDeck = new testDeck();

test('Check array has 52 cards', () => {

    if(cardDeck.deck.length == 52) {
        console.log(cardDeck.deck.length);
        console.log("There are 52 cards in the deck");
    }
    else {
        throw Error;
    }
})

test('Check for card duplicates in deck', () => {

    let deck = cardDeck.deck;

    let findDuplicates = arr => arr.filter((values, index) => arr.indexOf(values) != index)
    
    if(findDuplicates(deck).length == 0) {
        console.log("No duplicate cards found in deck");
    } else {
        console.log(findDuplicates(deck).length + " duplicate cards found in deck");
        throw Error;
    }
})