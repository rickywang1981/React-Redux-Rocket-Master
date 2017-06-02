import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();
        this.state = {
            number: 0,
        };
    }

    render() {
        return (
            <CounterCalc></CounterCalc>
        )
    }
}


class CounterCalc extends Component {
    constructor() {        
        super();
        this.state = {
            sum: 0,
            inputVal:1
        };
    }

    handleTextChange = (event) => {
        this.setState({inputVal: event.target.value});
    }

     render() {
        return (
            <div>
            <input type="text" value={this.state.inputVal} onChange={this.handleTextChange} ref={(input) => { this.textInput = input; }}></input>
            <button title="+" onClick={() => this.setState({sum: this.state.sum + Number(this.textInput.value)})}>+</button>
            <button title="-" onClick={() => this.setState({sum: this.state.sum - Number(this.textInput.value)})}>-</button>
            <OutputFormatter sum={this.state.sum}></OutputFormatter>
            </div>
        );
    }
}

class OutputFormatter extends Component {
    render() {
        return (
            <span> = {this.props.sum}</span>
        );
    }
}

module.exports = App;