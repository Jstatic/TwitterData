var _ = require('underscore');
var $ = require('jquery');
var io = require('socket.io-client');

var socket = io.connect();

export default class twitterService {
    search(query) {
        let tweets = new Promise((resolve, reject) => {
            let queries = [];
            _.each(query, (q) => {
                queries.push(`${q.param}=${q.value}`);
            })
            let searchString = queries.join('&');
            $.get(`/tweets?${searchString}`, (data) => {
                resolve(data);
            });
        });
        return tweets;
    }
    streamTweets(key) {
        socket.emit('get stream', key.q);
        socket.on('tweets', function(data){
            this.tweet = data;
        });
    }
}