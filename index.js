'use strict';

var https = require('https');
var alexa = require('alexa-app')
var app = new alexa.app('I Need A Prompt');

app.launch(sendPrompt);
app.intent('', {}, sendPrompt);
app.intent('PromptMe', {}, sendPrompt);
app.intent('AMAZON.HelpIntent', {}, function(request, response){
	response.say("I Need A Prompt doesn't take any options. Simply say, 'I need a prompt', and I'll give you one.")
});

exports.handler = app.lambda();

function sendPrompt(request, response, callback){
	var aggregate = '';
	https.get('https://ineedaprompt.com/api/text', function(api){
		api.on('data', function(data){
			aggregate += data;
		});
		api.on('end', function(){
			response.say(aggregate).send();
		});
	});
	return false;
}
