require("dotenv").config();

var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
// console.log('====== keys ======')
// console.log(keys.spotify.id)
// console.log('====== end of keys ======')
//getting npm package
var request = require("request");
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});
// user inputs
var action = process.argv[2];
var value = process.argv[3];
var movieName = "";


// switch case 
switch (action) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}
// OMDB request
function movieThis() {
    if (typeof value === 'undefined') {

        request("http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy", omdbResponse)

    }
    else {
        // for (var i = 3; i < process.argv.length; i++) {
        //     movieName = movieName + process.argv[i] + " ";
        // }
        movieName = value;
        request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", omdbResponse)

    }

}
function omdbResponse(error, response, body) {
    if (!error && response.statusCode === 200) {
        // console.log(JSON.parse(body));
        console.log("Title of the Movie: " + JSON.parse(body).Title);
        console.log("Year the movie came out: " + JSON.parse(body).Year);
        console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country where the movie was produced: " + JSON.parse(body).Country);
        console.log("Language of the movie: " + JSON.parse(body).Language);
        console.log("Plot of the movie: " + JSON.parse(body).Plot);
        console.log("Actors in the movie: " + JSON.parse(body).Actors);
    }

};

// spotify request
function spotifyThisSong() {
    // console.log(value);
    if (typeof value === 'undefined') {

        spotify.search({ type: "track", query:"The Sign"}, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
           
                console.log(data.artists[0].name);
            
            // loop through obejct 
            // for (var key in data) {
            //     if()
            //     console.log(JSON.stringify(data.artists[0], null, 2));
            // }
        });
    }
    else {
        
        spotify.search({ type: "track", query: value }, function (err, data){
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // loop through obejct 
           
                    console.log(data.artists[0].name);
                
               
            });
    }

}
