var _ = require('underscore');
var $ = require('jquery');
var io = require('socket.io-client');

var socket = io.connect();

module.exports = {
    constructor: function() {
        this.tweet = 'Fetching Tweets';
    },
    search: function(query) {
        var queries = [];
        var index = 0;
        for (var param in query) {
            queries.push(param + '=' + query[param]);
        }
        var searchString = queries.join('&');
        searchString += '&result_type=recent&geocode=30.2669444,-97.7427778,5mi';
        this.fetchTweets(searchString);
    },
    fetchTweets: function(searchString) {
        $.get('/tweets?' + searchString, function(data){
            var resultGeos = [];
            _.each(data.statuses, function(tweet){
                if (tweet.geo) {
                    resultGeos.push([tweet.geo.coordinates[0], tweet.geo.coordinates[0]]);
                }
            });
            console.log(data);
            console.log(resultGeos);
        });
    },
    streamTweets: function() {
        console.log('start');
        socket.on('tweets', function(data){
            console.log(data);
            return data;
        });
    }
};