let _ = require('underscore');
let React = require('react');
let ReactDOM = require('react-dom');
let styles = require('./styles.js');
import twitterService from './twitter/twitterService.js';
let Twitter = new twitterService;

let theseTweets = ['Get Tweets'];
let formFields = [
    {
        id: 'Search Query',
        param: 'q',
        type: 'text',
        value: 'Poop'
    },
    {
        id: 'Result Type',
        param: 'result_type',
        type: 'text',
        value: 'recent'
    }
];

const FormComponent = React.createClass({
    getInitialState() {
        let initState = {};
        _.each(this.props.fields, function(field, i){
            initState[field.id] = {
                param: field.param,
                value: field.value
            };
        });
        return initState;
    },
    handleFieldChange(props, val) {
        let newState = {};
        newState[props.id] = {
            param: props.param,
            value: val
        }
        this.setState(newState);
    },
    handleKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.doSearch();
        }
    },
    doSearch() {
        Twitter.search(this.state).then((result) => {
            theseTweets = [];
            _.map(result.statuses, (status) => {
                theseTweets.push(status.text);
            });
            renderTweetStream();
        });
    },
    render: function() {
        let inputFields = _.map(this.props.fields, function(field, i) {
            return <p>
                <label>{field.id}</label>
                <InputField
                    onChange={this.handleFieldChange}
                    key={i}
                    param={field.param}
                    id={field.id}
                    type={field.type}
                    initval={field.value} />
            </p>
        }, this);
        return (
            <form onSubmit={this.doSearch} onKeyDown={this.handleKeyDown}>
                {inputFields}
            </form>
        );
    }
});

const InputField = React.createClass({
    getInitialState() {
        return {
            value: this.props.initval
        };
    },
    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.onChange(this.props, event.target.value);
    },
    render() {
        let value = this.state.value;
        let type = this.props.type;
        return <input type={type} value={value} onChange={this.handleChange} />
    }
});

const TweetStream = React.createClass({
    render() {
        let lineItems = [];
        for (let value of this.props.tweets) {
            lineItems.push(<li>{value}</li>);
        }
        return (
            <ul className="tweet-stream">
            {lineItems}
            </ul>
        );
    }
});

ReactDOM.render(
    <FormComponent fields={formFields} />,
    document.getElementById('main')
);

const renderTweetStream = () => {
    ReactDOM.render(
        <TweetStream tweets={theseTweets} />,
        document.getElementById('data')
    );
}
renderTweetStream();
