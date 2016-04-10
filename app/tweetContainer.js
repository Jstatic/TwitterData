import React from 'react';

const TweetStream = React.createClass({
    render() {
        let newArray = [];
        for (let value of this.props.data) {
            newArray.push(<li>{value}</li>);
        }
        return (
            <ul className="tweet-stream">{newArray}</ul>
        );
    }
});

export default TweetStream;