var keys = require("./keys.js");
var inquirer = require('inquirer');
var Twitter = require('twitter');

// twitter keys 
var consumer_key = keys.twitterKeys.consumer_key;
var consumer_secret = keys.twitterKeys.consumer_secret;
var access_token_key = keys.twitterKeys.access_token_key;
var access_token_secret = keys.twitterKeys.access_token_secret;

var client = new Twitter({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    access_token_key: access_token_key,
    access_token_secret: access_token_secret
  });

var nodeArgs = process.argv;

// the command will be the firsdt thing the user types in the command console. 
var command = nodeArgs[2];


//twitter part of hw
if(command === "my-tweets"){
    var params = {screen_name: 'dpereztwitbot'};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if(error){
            console.log("Something has gone wrong.");
        }
        for(i=0; i<20; i++){
            console.log(tweets[i].text);
        }
    })
}