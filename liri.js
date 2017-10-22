var keys = require("./keys.js");
var inquirer = require('inquirer');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

// twitter keys 
var consumer_key = keys.twitterKeys.consumer_key;
var consumer_secret = keys.twitterKeys.consumer_secret;
var access_token_key = keys.twitterKeys.access_token_key;
var access_token_secret = keys.twitterKeys.access_token_secret;

//spotify keys
var clientID = keys.spotifyKeys.clientid;
var clientSecret = keys.spotifyKeys.client_secret;

var spotify = new Spotify({
    id: clientID,
    secret: clientSecret
  });

var client = new Twitter({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    access_token_key: access_token_key,
    access_token_secret: access_token_secret
  });

var nodeArgs = process.argv;

// the command will be the firsdt thing the user types in the command console. 
var command = nodeArgs[2];

//function that gets tweets 
function getTweets(username){
    var params = {screen_name: username};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if(error){
            console.log("Something has gone wrong.");
        }
        for(i=0; i<20; i++){
            console.log(tweets[i].text);
        }
    });
}

function getSpotifyInformation(){

}

function getMovieInfo(){

}

//twitter part of hw
if(command === "my-tweets"){
    getTweets('dpereztwitbot');
}

else if(command === "spotify-this-song"){
    getSpotifyInformation();
}

else if(command === "movie-this"){
    getMovieInfo();
}

else if(command === "do-what-it-says"){
    // do whatever command is in the text 
}
