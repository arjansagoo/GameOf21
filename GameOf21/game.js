let Questions = require('./Model/questions');
let Responses = require('./Model/responses');
let Player = require('./Model/players');
const Dealer = require('./Model/dealer');
const QuestionService = require('./Controller/question-service');
const DealerService = require('./Controller/dealer-service');
const ResponseService = require('./Controller/response-service');

let dealerService = new DealerService();
let questionService = new QuestionService();
let responseService = new ResponseService();

const allQuestions = new Questions();
// const responses = new Responses();

const dealer = new Dealer();
let player1 = new Player("Sam");

let currentCard;
let result;
let userResponse = questionService.userResponse;
let responseListener = questionService.userResponseListener;
responseListener.addListener('received', dealCardToPlayer);


//Start game()
startGame();

//Phase 0
//Dealer initialises the card deck
function startGame(){
    console.log(responseService.allResponses[0].Shuffling);

//  Display unshuffled deck of cards.
//  console.log(dealerService.deckOfCards);
    
    dealerService.shuffleDeck();

//  Display shuffled deck of cards
  console.log(dealerService.deckOfCards);

    console.log(responseService.allResponses[0].Shuffled);
    firstHand();
}

//Phase 1 
//First hand - both the dealer and sam are given two cards from the top of a shuffled deck
//User inputs required for service are "Yes" or "No"
//Player may lose at this phase which would end the game. 
//Otherwise game will move to phase 2 automatically once card draws for Sam are complete
function firstHand(){
    console.log(responseService.allResponses[1].Draw);
    playerCardHit(player1);
    playerCardHit(player1);
    console.log(responseService.allResponses[1].PlayerDeal + getPlayerTotal(player1));
    console.log("\n");
    console.log(responseService.allResponses[1].DealerDeal);
    dealersCardHit();
    dealersCardHit();
    checkDealerScore();
    console.log(responseService.allResponses[1].DealerScore + getDealerTotal());
    requestDealCardResponse();
}

//Phase 2
//Dealers turn - Dealers hand is automatically dealt and the players fate will be determined at the end of this phase.
//The dealer is will select cards up to a minimum of 17, where it will stop dealing.
//If the dealer draws over 21 the player automatically wins.
//The last case is the dealers hand is compared to the users hand.
//After this the winner of the game is selected.
//Will automatically move to phase end of game phase and winner selected
function dealersTurn(){
    console.log("\n");
    console.log(responseService.allResponses[2].DealersTurn);
    dealCardsToDealer();
    console.log(responseService.allResponses[2].DealersTotal + getDealerTotal());
    getGameResults();
}

//endOfGame - console log repsonses depending on the winner, or if it's a draw
function endOfGame(){
    console.log("\n");
    if(result == 5) {
        console.log(responseService.allResponses[3].DealerBlackjack);
        console.log(responseService.allResponses[3].DealerWins);
    }
    else if(result == 4) {
        console.log(responseService.allResponses[3].Blackjack);
        console.log(responseService.allResponses[3].Winner);
    }
    else if(result == 3){
        console.log(responseService.allResponses[3].ADraw);
    }
    else if(result == 2){
        console.log(responseService.allResponses[3].DealerWins);
    }
    else if(result == 1){
        console.log(responseService.allResponses[3].Winner);
    }

    console.log(responseService.allResponses[3].GameOver);
}

// Assign the result number to determine the winner in the endOfGame() functio
function getGameResults(){

    if(getPlayerTotal(player1) == getDealerTotal()){
        result = 3;
    }
    else if(getPlayerTotal(player1) > getDealerTotal()){
        if(getPlayerTotal(player1) == 21) { result = 4; }
        else { result = 1; }
    }
    else if(getDealerTotal() > 21) {
        result = 1;
    }
    else if(getPlayerTotal(player1) < getDealerTotal()){
        if(getDealerTotal() == 21) { result = 5; }
        else { result = 2; }
    }
    endOfGame();
}

//Automatically deals cards to the dealer hand as long as the total is below 17
function dealCardsToDealer(){
    while(dealer.cardTotal < 17){
        dealersCardHit();
    }
    checkDealerScore();
  }

// Dealer card hit function, then add to total
function dealersCardHit(){
    let dealerCard = dealerService.cardHit();
    dealer.cardHand.push(dealerCard);
    console.log(dealerCard.Value + " " + dealerCard.Suit);
    addDealerTotal();
}

// Add dealers recent card hand value to the current total
function addDealerTotal(){
    let recentCard = dealer.cardHand.shift();
    dealer.cardTotal = dealer.cardTotal + recentCard.Weight;
}

// Return dealer card total points
function getDealerTotal(){
    return dealer.cardTotal;
}

// Add players recent card hand value to the current total
function addToPlayerTotal(player){
    let recentCard = player.cardHand.shift();
    player.cardTotal = player.cardTotal + recentCard.Weight;
}

// Return Sams card total points
function getPlayerTotal(player){
    return player.cardTotal;
}

// Player hit function and add total
function playerCardHit(player){
    let selectedCard = dealerService.cardHit();
    player.cardHand.push(selectedCard);
    currentCard = selectedCard.Weight;
    console.log(selectedCard.Value + " " + selectedCard.Suit);
    addToPlayerTotal(player);
}

//Check score for dealer to determine if they have gone over 21 and automatically lose
function checkDealerScore() {
    if(dealer.cardTotal > 21) {
        console.log(responseService.allResponses[2].DealerLoser);
    }
}

//Check score for player and allow to hit as long as the total is less or equal to 21
function checkPlayerScore() {
    
    if(getPlayerTotal(player1) <= 21){
        console.log(responseService.allResponses[1].PlayerDeal + currentCard + ", " + responseService.allResponses[1].CurrentScore + getPlayerTotal(player1));    
        requestDealCardResponse();
    } 
    else {
        questionService.gameOver();
        console.log(responseService.allResponses[1].PlayerDeal + "total of " + getPlayerTotal(player1) + ". " + responseService.allResponses[3].Loser);
        console.log(responseService.allResponses[1].DealerWins);
        }
}

//Keep hitting a new card to the player hand until they say no, then it will move to phase 2 (Dealers turn);
function dealCardToPlayer(){
    userResponse = questionService.userResponse;
    if(userResponse == true){
        playerCardHit(player1);
        checkPlayerScore();
    } else {
        dealersTurn();
    }
}

function requestDealCardResponse(){
    questionService.getResponse(allQuestions.questions[0].Question);
}