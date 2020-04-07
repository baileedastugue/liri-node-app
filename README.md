# liri-node-app
Language Interpretation and Recognition Interface

#### About the Application

This app essentially acts as a refined search engine for the user - the user can search for a song track, movie information, and/or concert information without leaving the app or going to three separate sites. The expedites information gathering and synthesizes the data all in one place. It evaluates two user inputs (a command and a term) and searches three different APIs to return the corresponding result. 

The app is organized based on what the user is searching for and is separated into three distinct categories: spotify-this-track, movie-this, and concert-this. Spotify-this-track returns song information on the term specified by the user, movie-this returns information on the user-specified specified movie, and concert-this returns concert data for the artist or group they user specified. All returned information is stored in a seprate file, essentially acting as a search history. Additional features include do-what-it-says, which reads commands from a separate text file, and clear, which clears the search history file.

#### How to run the app:
The app must be run in the terminal, rooted in the liri.js file. Note that the user must begin every command line input with "node liri.js" regardless of what they are searching for. 
*To search for a song within Spotify:*
1. In the command line, type the following
    node liri.js spotify-this-song
2. After "spotify-this-song", type the song of your choice. 
3. Press 'enter'
4. The program will return the 5 tracks that most closely match your song choice. If no song exists within the Spotify npm, the program automatically returns "The Sign" by Ace of Base.

*To search for a movie within OMDb:*
1. In the command line, type the following
    node liri.js movie-this
2. After "movie-this", type the movie of your choice. 
3. Press 'enter'
4. The program will return the movie title that most closely matches your choice. If no movie matches the input, data for Mr. Nobody will be returned.

*To search for a concert within Bands in Town:*
1. In the command line, type the following
    node liri.js concert-this
2. After "concert-this", type the performer of your choice. 
3. Press 'enter'
4. The program will return concert data for your specified performer. If the performer does not exist or there is no data for them, Billy Joel's concert data will be returned.

*To perform the commands in a separate file:*
1. In the command line, type the following
    node liri.js do-what-it-says
2. Press 'enter'
3. The program will return the corresponding data, depending on what is defined in the separate file.

*To clear the stored search data in a separate file:*
1. In the command line, type the following
    node liri.js clear
2. Press 'enter'
3. The separate file will be cleared of all information.

#### [GitHub Link](https://github.com/baileedastugue/liri-node-app)
#### [YouTube Demostration of Program](https://www.youtube.com/watch?v=oMQSGsOPXQE&feature=youtu.be)
#### [YouTube Demostration of Prototype](https://www.youtube.com/watch?v=1cJlDloAIVI&feature=youtu.be)

#### Technologies used:
*To create the application:*
- Node.js
- JavaScript
- Node-spotify API, Axios, OMDB API, Bands in Town API, Moment, DotEnv
- GitIgnore
- Obscuring API keys

*To create prototype:*
- Adobe XD

#### My role
As part of a bootcamp homework assignment, I created all files associated with the application as designated by the homework requirements. I added additional features such as the 'clear' function and returning Billy Joel when there is no performer specified for the 'concert-this' function. I also included a prototype of the application, beyond the homework assignment.