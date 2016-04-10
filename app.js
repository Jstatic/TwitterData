var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Twitter = require('twitter');
var twitterKeys = require('./twitterKeys');

var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret
});

app.get('/tweets', function(req, res) {
  console.log(req.query);
  var params = req.query;
  client.get('search/tweets', params, function(error, tweets, response) {
      if (!error) {
          res.json(tweets);
          res.end();
      } else if (error) {
        console.log(error);
      }
  });
});

io.on('connection', function(socket){
    socket.on('get stream', function(data){
      console.log(data);
      client.stream('statuses/filter', {track: data}, function(stream) {
        stream.on('data', function(tweet) {
          socket.emit('tweets', tweet);
        });
        stream.on('error', function(error) {
          console.log(error);
        });
      });

    });
});

app.use(express.static('public'));

server.listen(port, function() {
    console.log("Listening on port " + port);
});