import React from 'react';
import _ from 'underscore';

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
            this.props.doSearch(this.state);
        }
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

export default FormComponent;