console.log("Loading function");
var AWS = require("aws-sdk");
exports.handler = function(event, context) {
    var eventText = JSON.stringify(event, null, 2);
    var jsonObj = JSON.parse(eventText);
   console.log("Received event:", eventText);
    var sns = new AWS.SNS();
    var params = {
       Message:"Olá. Prezado(a) aluno(a) " + jsonObj.nome + ", você está aprendendo sobre AWS IoT?",
        Subject: "Pergunta em aula.",
        PhoneNumber: jsonObj.fone
    };
    sns.publish(params, context.done);
};
