var request = require("request");
var twitterKeys = require("./keys").twitterKeys;
var spotifyKeys = require("./keys").spotifyKeys;
var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var userInput = process.argv;
var action = userInput[2];
var spotSearch = userInput.slice(3, userInput.length).join(' ');
var omdbSearch = userInput.slice(3, userInput.lenth).join('+')

var queryUrl = "http://www.omdbapi.com/?t=" + omdbSearch + "&y=&plot=short&apikey=40e9cece";

console.log(action)
console.log('----------------');
// The switch-case will direct which function gets run.

switch(action) {
  case "help":
    help();
    break;

  case "my-tweets":
    tweets();
    break;

  case "spotify-this-song":
    spotify();
    break;

  case "movie-this":
    omdb();
    break;

  case "do-what-it-says":
    doThis();
    break;
}
//if twitter function is called
function tweets(){
  client = new Twitter({
    consumer_key: twitterKeys.consumer_key,
    consumer_secret: twitterKeys.consumer_secret,
    access_token_key: twitterKeys.access_token_key,
    access_token_secret: twitterKeys.access_token_secret,
  });
  // if(!spotName){
  //   spotName = "bljhawk";
  // }
  // var params = {screen_name: spotName};
  client.get('statuses/user_timeline/', function(error, tweets, response){
    //console.log(arguments)
    if(!error){
      for (var i = 0; i < tweets.length && i < 20; i++){
        console.log('Tweet # ' + (i + 1) + '--------------' + '\n' + tweets[i].created_at + '\n' + tweets[i].text + 'n' + tweets[i].retweet_count + ' retweets')
        // var dStr = tweets[i].created_at;
        // var d = dStr.replace("+0000 ", "");
        // var tweetResults = d + ": " + "@" + tweets[i].user.screen_name + ": " + tweets[i].text + "\r\n";
        // console.log(tweetResults);
      }
    }
  });
}

function help(){
  console.log("------------------------");
  console.log("Type one of the following actions to get a response: ");
  console.log("'my-tweets' to see my last 20 tweets");
  console.log("'spotify-this-song + (song title)' to search spotify");
  console.log("'movie-this + (movie title)' to search the OMDB database");
  console.log("do-what-it-says");
  console.log("------------------------");
}

// If the spotify function is called
function spotify(){
  spotify = new Spotify({
    id: spotifyKeys.id,
    secret: spotifyKeys.secret,
  });
  //console.log(spotSearch);
  if(spotSearch !== ""){
    spotify.search({
      type:'track',
      query: spotSearch,
    }, function(err, data){
      if (!err){
        var trackInfo = data.tracks.items[0];
        //console.log(data);
        //console.log(spotSearch);
        console.log('Title: ' + trackInfo.name + '\nAlbum: ' + trackInfo.album.name + '\nArtists: ');
        for (i = 0; i < trackInfo.album.artists.length; i++){
          console.log(trackInfo.artists[i].name)
        }
        console.log('Preview Link: ' + trackInfo.href)
      }
    })
  }
  else {
    spotify.search({type:'track', query:'The Sign Ace of Base'}, function(err, data){
      if (!err){
        var trackInfo = data.tracks.item[0];
        cconsole.log("Title: " + trackInfo.name + '\nAlbum: ' + trackInfo.album.name + '\nArtists: ');
        for (i = 0; i < trackInfo.album.artists.length; i++){
          console.log(trackInfo.artists[i].name)
        }
        console.log('Preview Link: ' + trackInfo.href)
      }
    })
  }
  // spotify.search({type:'artist', query: spotSearch}, function(err, data){
  //   if (err){
  //     return console.log('Error occured: ' + err);
  //   }
  // console.log(data);
};
  // .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
  // .then(function(data){
  //   console.log(data);
  // })
  // .catch(function(err){
  //   console.log('Error occurred: ' + err);
  // });


//if the OMDB function is called
function omdb(){
  request(queryUrl, function(error, repsponse, body){
    if (!error ){
      var movie = JSON.parse(body);
      console.log('Title: ' + movie.Title + '\nYear: ' + movie.Year + '\nIMDB Rating: ' + movie.imdbRating + '\nRotten Tomatoes Rating: ' + movie.Ratings[1].Value + '\nCountry: ' + movie.Country + '\nLanguage: ' + movie.Language + '\nPlot: ' + movie.Plot + '\nActors: ' + movie.Actors);
    }else {
      console.log(error)
    }
  });
}

//if the doThis function is called
function doThis(){
 fs.readFile("random.txt", "utf8", function(error, data){
   if (!error) {
     var doThisResults = data.split(',');
     var spotSearch = doThisResults[1];

     console.log(doThisResults);
     spotify = new Spotify({
       id: spotifyKeys.id,
       secret: spotifyKeys.secret,
     });
     //console.log(spotSearch);
     if(spotSearch !== ""){
       spotify.search({
         type:'track',
         query: spotSearch,
       }, function(err, data){
         if (!err){
           var trackInfo = data.tracks.items[0];
           //console.log(data);
           //console.log(spotSearch);
           console.log('Title: ' + trackInfo.name + '\nAlbum: ' + trackInfo.album.name + '\nArtists: ');
           for (i = 0; i < trackInfo.album.artists.length; i++){
             console.log(trackInfo.artists[i].name)
           }
           console.log('Preview Link: ' + trackInfo.href)
         }
       })
     }
     else {
       spotify.search({type:'track', query:'The Sign Ace of Base'}, function(err, data){
         if (!err){
           var trackInfo = data.tracks.item[0];
           cconsole.log("Title: " + trackInfo.name + '\nAlbum: ' + trackInfo.album.name + '\nArtists: ');
           for (i = 0; i < trackInfo.album.artists.length; i++){
             console.log(trackInfo.artists[i].name)
           }
           console.log('Preview Link: ' + trackInfo.href)
         }
       })
     }
   };
  })
}     
