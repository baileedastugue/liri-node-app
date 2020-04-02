require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var fs = require("fs");
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
var output = "";

// function appendOutput () {
//     fs.appendFile("log.txt", output, function(err) {

//         // If an error was experienced we will log it.
//         if (err) {
//           console.log(err);
//         }
      
//         // If no error is experienced, we'll log the phrase "Content Added" to our node console.
//         else {
//           console.log("Content Added!");
//         }
      
//       });
// }

function performCommand () {
    if (command === "spotify-this-song") {
    spotify.search({ type: 'track', query: userInput, limit: 5}, function(err, data) {
        if (err) {
           console.log("Error occurred: " + err);
        }
        else if (data.tracks.items.length == 0) {
            spotify.search({type: 'track', query: "The Sign"}, function(err, data) {
                if (err) {
                    console.log("Error occurred: " + err);
                }
                else {
                    output = "Sorry! Your song couldn't be found, please enjoy some Ace of Base instead";
                    console.log(output);
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
    if (userInput == "") {
        userInput = "Billy Joel";
    }
    var queryURL = "https://rest.bandsintown.com/artists/" + 
                    userInput + "/events?app_id=codingbootcamp";

    axios.get(queryURL)
        .then(function(response){
        console.log("Performer: " + response.data[0].lineup[0] + "\n");
        console.log("Venue name: " + response.data[0].venue.name + "\n");
        console.log("Venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.country + "\n");
        console.log("Concert date: " + moment(response.data[0].datetime).format("dddd, MMMM Do YYYY") + "\n"); 
        console.log("Concert time: " + moment(response.data[0].datetime).format("h:mm a") + "\n=============="); 
    })
    }

    if (command === "movie-this") {
    if (userInput ==  "") {
        userInput = "Mr. Nobody";
    }
    console.log(userInput);
    var queryURL = "http://www.omdbapi.com/?t=" + 
                    userInput + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL)
        .then(function(response) {
            console.log("Movie title: " + response.data.Title  + "\n");
            console.log("Release date: " + response.data.Released  + "\n");
            console.log("Plot of the movie: " + response.data.Plot  + "\n");
            console.log("Actors in the movie: " + response.data.Actors  + "\n");
            console.log("Country produced in: " + response.data.Country  + "\n");
            console.log("Language of the movie: " + response.data.Language  + "\n");
            console.log("IMDb rating: " + response.data.imdbRating  + "\n");
            console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value + "\n==============");
        })
    }
}

if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        }
        else {
            inputArray = data.split(",");
            command = inputArray[0];
            userInput = inputArray[1];
            performCommand();
        }
    })
}


getInput();
performCommand();