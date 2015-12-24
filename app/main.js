var React = require('react');
var ReactDOM = require('react-dom');
var styles = require('./styles.js');


var MainComponent = React.createClass({
    render: function() {
        return (
            <p style={styles.p}>
            <InputComponent initval="Hiiiiii" /><br />
            <img src="static/img/Bunny-Typing.gif" />
            </p>
        );
    }
});

var InputComponent = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.initval,
            windowWidth: window.innerWidth
        };
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    handleResize: function(e) {
        this.setState({windowWidth: window.innerWidth});
    },
    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);
    },
    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },
    render: function() {
        var value = this.state.value;
        return <span><input type="text" value={value} onChange={this.handleChange} />width is {this.state.windowWidth}</span>
    }
});

ReactDOM.render(
    <MainComponent />,
    document.getElementById('main')
);