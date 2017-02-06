'use strict';

var https = require('https');
var alexa = require('alexa-app')
var app = new alexa.app('INeedAPrompt');

app.intent('Prompt', {
		'utterances': [
			'Prompt me',
			'Prompt please'
		]
	},
	function(request, response, callback){
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
);

exports.handler = app.lambda();
