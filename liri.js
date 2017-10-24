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

//OMDB keys 
var omdbAPIKey = keys.OMDBKeys.APIKey;

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

// to make the string from multi word inputs becasue process.argv is a pain. 
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
        if (err) { //check for errors 
          return console.log('Error occurred: ' + err);
        }
        
        // return the first 20 results 
        for(i=0; i<20; i++){
            var artists = []; // make an array for songs with multiple artists 
            for(j=0; j<data.tracks.items[i].artists.length; j++){
                // put the artists in the array
                artists.push(data.tracks.items[i].artists[j].name);
            }
            console.log("Song name: " + data.tracks.items[i].name); //name of song
            console.log("Artists: " + artists.join(', ')); //artists
            console.log("Album: " + data.tracks.items[i].album.name); //album name 
            if(data.tracks.items[i].preview_url == null){ //check to see if song has preview 
                console.log("Preview link: Sorry no preview link available"); //no preview 
            }
            else{
                console.log("Preview link: " + data.tracks.items[i].preview_url); //preview 
            }
            console.log(" "); //line break 
        } 
    });
}

function getMovieInfo(movieName){
    var baseURL = "http://www.omdbapi.com/?apikey=" + omdbAPIKey + "&";
    var queryURL = baseURL + "t=" + movieName;

// need to put plus signs for spaces. 

    // need to use request here. 
    // * Title of the movie.
    // * Year the movie came out.
    // * IMDB Rating of the movie.
    // * Rotten Tomatoes Rating of the movie.
    // * Country where the movie was produced.
    // * Language of the movie.
    // * Plot of the movie.
    // * Actors in the movie.

}

//twitter part of hw
if(command === "my-tweets"){
    getTweets('dpereztwitbot');
}

else if(command === "spotify-this-song"){
    // get the song name the user entered and put it as a parameter. 

    makeStringFromInput();
    //if user doesnt search a song default to The Sign 
    if(searchQuery.trim() === ""){
        searchQuery = "The Sign";
    }
    getSpotifyInformation(searchQuery);
}

else if(command === "movie-this"){
    getMovieInfo();
}

else if(command === "do-what-it-says"){
    // do whatever command is in the text 
}
