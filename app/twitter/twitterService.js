import $ from 'jquery';
import _ from 'underscore';
import io from 'socket.io-client';

var socket = io.connect();

export default class TwitterService {
    search(query) {
        const tweets = new Promise((resolve, reject) => {
            const queries = [];
            _.map(query, (q) => {
                queries.push(`${q.param}=${q.value}`);
            })
            const searchString = queries.join('&');
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