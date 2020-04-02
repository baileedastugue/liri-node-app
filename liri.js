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
var searchNumber =0;
var output = "";
function appendOutput () {
    fs.appendFile("log.txt", output, function(err) {
        if (err) {
          console.log(err);
        }
       
      });
}

function performCommand () {
    if (command === "clear") {
        searchNumber = 0;
        fs.writeFile("log.txt", "", function(err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Search history cleared!")
            }
        })
    }
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
                    output = "Sorry! Your song couldn't be found, please enjoy some Ace of Base instead. \n Artist Name: " + data.tracks.items[0].album.artists[0].name + 
                            "\n Track Name: " + data.tracks.items[0].name + 
                            "\n Song Preview: " + data.tracks.items[0].preview_url + 
                            "\n Album Name: " + data.tracks.items[0].album.name + "\n==============\n";
                    console.log(output);
                    appendOutput();
                    
                }
            })
        }
        else {
           for (var i = 0; i < data.tracks.items.length; i++) {
                output = "Artist Name: " + data.tracks.items[i].album.artists[0].name +
                                    "\nTrack Name: " + data.tracks.items[i].name+ 
                                    "\nSong Preview: " + data.tracks.items[i].preview_url +
                                    "\nAlbum name: " + data.tracks.items[i].album.name + "\n==============\n"; 
                console.log(output);
                appendOutput();
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
            output = "Performer: " + response.data[0].lineup[0] + 
                        "\nVenue name: " + response.data[0].venue.name + 
                        "\nVenue location: " + response.data[0].venue.city + ", " + response.data[0].venue.country + 
                        "\nConcert date: " + moment(response.data[0].datetime).format("dddd, MMMM Do YYYY") + 
                        "\nConcert time: " + moment(response.data[0].datetime).format("h:mm a") + "\n==============\n";
            console.log(output);
            appendOutput();
    })
    }

    if (command === "movie-this") {
    if (userInput ==  "") {
        userInput = "Mr. Nobody";
    }
    var queryURL = "http://www.omdbapi.com/?t=" + 
                    userInput + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL)
        .then(function(response) {
            output = "Movie title: " + response.data.Title  + 
                        "\nRelease date: " + response.data.Released  +
                         "\nPlot of the movie: " + response.data.Plot  + 
                         "\nActors in the movie: " + response.data.Actors  + 
                         "\nCountry produced in: " + response.data.Country  + 
                         "\nLanguage of the movie: " + response.data.Language  + 
                         "\nIMDb rating: " + response.data.imdbRating  + 
                         "\nRotten Tomatoes rating: " + response.data.Ratings[1].Value + "\n==============\n";
            console.log(output);
            appendOutput();
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