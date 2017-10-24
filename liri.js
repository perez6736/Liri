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

// the command will be the first thing the user types in the command console. 
var command = nodeArgs[2];
var searchQuery = "";

function makeStringFromInput(){
    for (var i = 3; i < nodeArgs.length; i++) {
          if (i > 3 && i < nodeArgs.length) {
            searchQuery = searchQuery + "+" + nodeArgs[i];
          }
          else {
            searchQuery += nodeArgs[i];
          }
        }
}

//function that gets tweets 
function getTweets(username){
    var params = {screen_name: username};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if(error){
            console.log("Something has gone wrong.");
        }
        for(i=0; i<20; i++){
            //if the twitter account doesnt have 20 tweets - do nothing
            if(typeof(tweets[i]) != 'undefined'){
                console.log(tweets[i].text);
            }
        }
    });
}

function getSpotifyInformation(querySong){
    spotify.search({ type: 'track', query: querySong }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data.tracks.items);
      });
}

function getMovieInfo(){
    // need to use request here. 
}

//twitter part of hw
if(command === "my-tweets"){
    getTweets('dpereztwitbot');
}

else if(command === "spotify-this-song"){
    // get the song name the user entered and put it as a parameter. 

    makeStringFromInput();

    getSpotifyInformation(searchQuery);
}

else if(command === "movie-this"){
    getMovieInfo();
}

else if(command === "do-what-it-says"){
    // do whatever command is in the text 
}
