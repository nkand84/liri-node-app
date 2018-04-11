require("dotenv").config();
//getting npm package
// importing the file keys.js
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
// request npm pkg for omdb
var request = require("request");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
// user inputs
var action = process.argv[2];
var value = process.argv[3];
var dataTextFile = process.argv[4];


// switch case with command line arguments and functions 
switch (action) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifyThisSong(value);
        break;

    case "movie-this":
        movieThis(value);
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}
// OMDB request
function movieThis(movieName) {
    if (typeof movieName === 'undefined') {
        request("http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy", omdbResponse)
    }
    else {
        request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", omdbResponse)
    }

}
// OMDB response 
function omdbResponse(error, response, body) {
    if (!error && response.statusCode === 200) {
        // var movieToString = "";
        var movieToString = "\n=========================================================================" +
            "\nTitle of the Movie: " + JSON.parse(body).Title
            + "\nYear the movie came out: " + JSON.parse(body).Year
            + "\nIMDB Rating of the movie: " + JSON.parse(body).imdbRating
            + "\nRotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value
            + "\nCountry where the movie was produced: " + JSON.parse(body).Country
            + "\nLanguage of the movie: " + JSON.parse(body).Language
            + "\nPlot of the movie: " + JSON.parse(body).Plot
            + "Actors in the movie: " + JSON.parse(body).Actors
        console.log("Movie Info => " + movieToString);
        var fs = require("fs");
        // write the command line data into a text file
        fs.appendFile("data.txt", movieToString, appendData)
    }
};

// spotify request
function spotifyThisSong(songName) {
    // console.log(value);
    if (typeof songName === 'undefined') {
        spotify.search({ type: "track", query: "The Sign" }, spotifyResponse)
    }
    else {
        spotify.search({ type: "track", query: songName }, spotifyResponse)
    }
}
// spotify response 
function spotifyResponse(err, data) {
    var fs = require("fs");
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    var spotifyObj = data.tracks.items;
    var spotifyToString = "";
    // looping thru array of items inside the object
    for (var j = 0; j < spotifyObj.length; j++) {
        spotifyToString += "\n--------------------------Spotify Data-----------------------------------"
            + "\nSong Name => " + spotifyObj[j].name
            + "\nSpotify Preview Link => " + spotifyObj[j].preview_url
            + "\nAlbum the song is from => " + spotifyObj[j].album.name;
        for (var i = 0; i < spotifyObj[j].artists.length; i++) {
            spotifyToString += "\nArtists => " + spotifyObj[j].artists[i].name
        }
    }
    console.log("==================================================");
    console.log("This string goes into the data.txt file" + spotifyToString);
    fs.appendFile("data.txt", spotifyToString, appendData)
}


// twitter 
function myTweets() {
    var params = { screen_name: 'knkool84' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            var tweetsToString = ""
            // looping through an array of tweet info
            for (var t = 0; t < tweets.length; t++) {
                tweetsToString += "\n--------------------------Twitter Data--------------------------------"
                + "\n" + tweets[t].created_at
                + "\n" + tweets[t].text;
                // if tweets = 10 then come out of the for loop
                if (t === 9) { break; }
            }
            console.log(tweetsToString);
            var fs = require("fs");
            fs.appendFile("data.txt", tweetsToString, appendData)
        }
    });
}
// append function
function appendData(err) {
    if (err) {
        console.log(err);
    }

    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    else {
        console.log("Data file updated!");
    }
}
function doWhatItSays() {
    var fs = require("fs");
    // read file random.txt
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // console.log(data);
        // split the string at comma to get the command first
        var splitArray = data.split(',');
        // console.log(splitArray);
        // first index is the command
        // second index is the value to search for 
        if (splitArray[0] === "spotify-this-song") {
            spotifyThisSong(splitArray[1]);
        }
        else if (splitArray[0] === "movie-this") {
            movieThis(splitArray[1]);
        }
        else if (splitArray[0] === "my-tweets") {
            myTweets();
        }

    })
}