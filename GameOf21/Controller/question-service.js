const Questions = require('../Model/questions');
const Events = require('events');


module.exports = class QuestionService {
    userResponseListener = new Events.EventEmitter();
    questionSet = new Questions().getAllQuestions();

    questionService = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    userResponse;

    closeService(){
        this.questionService.close();
    }

    getResponse(input){
        this.questionService.question(input, answer => {
            if(this.checkValidResponse(input, answer) == true){
                let response = this.responseWithResult(input, answer);
                this.userResponse = response; 
                this.userResponseListener.emit('received');
                if(!response){
                    this.closeService();
                }
                return response;
            } else { this.getResponse(input) };
        });
    }

    gameOver(){
        this.closeService();
    }

    checkValidResponse(question, answer){
        if ( this.questionSet.find(q => q.Question == question && q.Answer == answer)) {
            return true;
        }
        else { return false };
    }

    responseWithResult(question, answer){
        let output = this.questionSet.find(q => q.Question == question && q.Answer == answer)
        return output.Result;
    }
}