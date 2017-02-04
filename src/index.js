'use strict';

var https = require('https');
var alexa = require('alexa-app');
var app = new alexa.app('INeedAPrompt');

app.intent('Prompt', {
		'utterances': [
			'Prompt me',
			'Prompt please'
		]
	},
	function(alexaReq, alexaRes, alexaCallback){
		var aggregate = '';
		https.get('https://ineedaprompt.com/api/text', function(api){
			api.on('data', function(data){
				aggregate += data;
			});
			api.on('end', function(){
				console.log(aggregate);
				alexaRes.say(aggregate);
				alexaCallback();
			});
		});
	}
);

exports.handler = app.lambda();
