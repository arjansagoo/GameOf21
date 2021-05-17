Responses = require('../Model/responses');

module.exports = class ResponseService{

    responseModel = new Responses();

    allResponses = this.responseModel.getAllResponses();
    


}