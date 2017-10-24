var keys = require("./keys.js");
var inquirer = require('inquirer');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

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


// function that takes in a song and uses the spotify npm to search for a song. 
function getSpotifyInformation(querySong){
    spotify.search({ type: 'track', query: querySong }, function(err, data) {
        if (err) { //check for errors 
          return console.log('Error occurred: ' + err);
        }
        
        // return the first 20 results 
        var spotifyData = data.tracks;
        for(i=0; i<20; i++){
            var artists = []; // make an array for songs with multiple artists 
            for(j=0; j<spotifyData.items[i].artists.length; j++){
                // put the artists in the array
                artists.push(spotifyData.items[i].artists[j].name);
            }
            console.log("Song name: " + spotifyData.items[i].name); //name of song
            console.log("Artists: " + artists.join(', ')); //artists
            console.log("Album: " + spotifyData.items[i].album.name); //album name 
            if(spotifyData.items[i].preview_url == null){ //check to see if song has preview 
                console.log("Preview link: Sorry no preview link available"); //no preview 
            }
            else{
                console.log("Preview link: " + spotifyData.items[i].preview_url); //preview 
            }
            console.log(" "); //line break 
        } 
    });
}

function getMovieInfo(movieName){
    //build a search URL to pass into request function 
    var baseURL = "http://www.omdbapi.com/?apikey=" + omdbAPIKey + "&";
    var queryURL = baseURL + "t=" + movieName;

    request(queryURL, function (error, response, body) {
        if(response.statusCode != 200){ //if the status is not 200 then print the status code and the error. 
            console.log('statusCode:', response && response.statusCode);
            console.log('error:', error);
        }
        var omdbData = JSON.parse(body); //need to parse the json to an object in order to grab the info i want. 

        // get all the infos. 
        console.log("Title: " + omdbData.Title);
        console.log("IMDB rating: " + omdbData.imdbRating);
        console.log("Rotten Tomatoes rating: " + omdbData.Ratings[1].Value);
        console.log("Country: " + omdbData.Country);
        console.log("Language: " + omdbData.Language);
        console.log("Plot: " + omdbData.Plot);
        console.log("Actors: " + omdbData.Actors);
        
      });

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

    makeStringFromInput();
    //if no search is entered then search for mr.nobody 
    if(searchQuery.trim() === ""){
        searchQuery = "Mr.+Nobody";
    }
    getMovieInfo(searchQuery);
}

else if(command === "do-what-it-says"){
    // make a function that will read the random.txt file and then do stuff with that. 
}
