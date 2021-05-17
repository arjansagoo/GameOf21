module.exports = class Questions {

    questions = [];

    constructor(){
        this.questions.push(
            { Question:'Would you like to hit another card? Enter "yes" to hit or "no" to stick. ', Answer: 'yes', Result: true },
            { Question:'Would you like to hit another card? Enter "yes" to hit or "no" to stick. ', Answer: 'no', Result: false }
        );
    }

    getAllQuestions(){
        return this.questions;
    }

}