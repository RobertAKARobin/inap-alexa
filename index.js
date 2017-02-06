'use strict';

var https = require('https');
var alexa = require('alexa-app')
var app = new alexa.app('I Need A Prompt');

app.intent('PromptMe', {}, sendPrompt);

exports.handler = app.lambda();

function sendPrompt(request, response, callback){
	var aggregate = '';
	https.get('https://ineedaprompt.com/api/text', function(api){
		api.on('data', function(data){
			aggregate += data;
		});
		api.on('end', function(){
			console.log(aggregate);
			response.say(aggregate);
			response.send();
		});
	});
	return false;
}
