var _ = require('underscore');

var React = require('react');
var ReactDOM = require('react-dom');
var styles = require('./styles.js');
var twitterService = require('./twitter/twitterService.js');

var FormComponent = React.createClass({
    getInitialState: function() {
        var initState = {};
        _.each(this.props.fields, function(field, i){
            initState[field.param] = field.value;
        });
        return initState;
    },
    handleFieldChange: function(fieldId, val) {
        var newState = {};
        newState[fieldId] = val;
        this.setState(newState);
    },
    handleKeyDown: function(event) {
        if (event.keyCode === 13) {
            this.doSearch();
        }
    },
    doSearch: function() {
        twitterService.search(this.state);
    },
    render: function() {
        var inputFields = _.map(this.props.fields, function(field, i) {
            return <InputField onChange={this.handleFieldChange} key={i} param={field.param} id={field.id} type={field.type} initval={field.value} />
        }, this);
        return (
            <form onSubmit={this.doSearch} onKeyDown={this.handleKeyDown}>
                {inputFields}
            </form>
        );
    }
});

var InputField = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.initval
        };
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
        this.props.onChange(this.props.param, event.target.value);
    },
    render: function() {
        var value = this.state.value;
        var type = this.props.type;
        return <input type={type} value={value} onChange={this.handleChange} />
    }
});

var tweetData;

var TweetStream = React.createClass({
    componentDidMount: function(){
        twitterService.streamTweets();
    },
    render: function() {
        return (
            <p>

            </p>
        );
    }
});

var formFields = [
    {
        id: 'Query',
        param: 'q',
        type: 'text',
        value: 'Santa'
    },
    {
        id: 'Count',
        param: 'count',
        type: 'number',
        value: '5'
    }
];

ReactDOM.render(
    <FormComponent fields={formFields} />,
    document.getElementById('main')
);

ReactDOM.render(
    <TweetStream />,
    document.getElementById('data')
);