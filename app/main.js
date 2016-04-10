import FormComponent from './form.js'
import TweetStream from './tweetContainer.js'
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import TwitterService from './twitter/twitterService.js';
const Twitter = new TwitterService();

let tweetData = ['Enter a search query'];
const formFields = [
    {
        id: 'Search Query',
        param: 'q',
        type: 'text',
        value: 'Fubar'
    },
    {
        id: 'Result Type',
        param: 'result_type',
        type: 'text',
        value: 'recent'
    },
    {
        id: 'Max Results',
        param: 'count',
        type: 'number',
        value: '100'
    }
];

const App = React.createClass({
    getInitialState() {
        return {
            tweets: tweetData
        };
    },
    search(data) {
        Twitter.search(data).then((result) => {
            tweetData = [];
            _.map(result.statuses, (status) => {
                tweetData.push(status.text);
            });
            this.setState({
                tweets: tweetData
            });
        });
    },
    render() {
        return (
            <div>
                <FormComponent doSearch={this.search} fields={formFields} />
                <TweetStream data={this.state.tweets} />
            </div>
        );
    }
});
ReactDOM.render(
    <App />,
    document.getElementById('main')
);