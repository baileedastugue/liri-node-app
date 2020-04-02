require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var userInput = "";
var inputArray = []; 
function getInput() {
    for (var i = 3; i < process.argv.length; i++) {
        inputArray.push(process.argv[i]);
        userInput = inputArray.join(" ");
    }
}
getInput();

if (command === "spotify-this-song") {
    spotify.search({ type: 'track', query: userInput, limit: 5}, function(err, data) {
        if (err) {
            console.log("apple");
            spotify.search({type: 'track', query: "The Sign"}, function(err, data) {
                if (err) {
                    console.log("Error occurred: " + err);
                }
                else {
                    console.log("Sorry! Your song couldn't be found, please enjoy some Ace of Base instead")
                    console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name + "\n"); 
                    console.log("Track Name: " + data.tracks.items[0].name+ "\n");
                    console.log("Song Preview: " + data.tracks.items[0].preview_url + "\n");
                    console.log(data.tracks.items[0].album.name);
                }
            })
        }
       else {
           for (var i = 0; i < data.tracks.items.length; i++) {
                console.log("Artist Name: " + data.tracks.items[i].album.artists[0].name + "\n"); 
                console.log("Track Name: " + data.tracks.items[i].name+ "\n");
                console.log("Song Preview: " + data.tracks.items[i].preview_url + "\n");
                console.log("Album name: " + data.tracks.items[i].album.name + "\n=============="); 
           }
       }
    });
}

if (command === "concert-this") {
    var queryURL = "https://rest.bandsintown.com/artists/" + 
                    userInput + "/events?app_id=codingbootcamp";

    axios.get(queryURL)
        .then(function(response){
        console.log("Venue name: " + response.data[0].venue.name + "\n");
        console.log("Venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.country + "\n");
        console.log("Concert date: " + moment(response.data[0].datetime).format("dddd, MMMM Do YYYY") + "\n"); 
        console.log("Concert time: " + moment(response.data[0].datetime).format("h:mm a") + "\n=============="); 
    })
}

if (command === "movie-this") {
    var queryURL = "http://www.omdbapi.com/?t=" + 
                    userInput + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL)
        .then(function(response) {
            console.log(response.data.Title);
            console.log(response.data.Released);

        })
}

// * `movie-this`
    // 3. `node liri.js movie-this '<movie name here>'`
    // * This will output the following information to your terminal/bash window:
    //     ```
    //     * Title of the movie.
    //     * Year the movie came out.
    //     * IMDB Rating of the movie.
    //     * Rotten Tomatoes Rating of the movie.
    //     * Country where the movie was produced.
    //     * Language of the movie.
    //     * Plot of the movie.
    //     * Actors in the movie.
    //     ```
    // * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    //     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
    //     * It's on Netflix!
    // * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

// * `do-what-it-says`
//     4. `node liri.js do-what-it-says`
//     * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//         * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//         * Edit the text in random.txt to test out the feature for movie-this and concert-this.