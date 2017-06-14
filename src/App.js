import React, { Component } from 'react';
import {OutputFormatter} from './OutputFormatter';
import LogItem, {LogListBuilder} from './LogListBuilder';

class App extends Component {
    constructor() {
        super();
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
            inputVal:1,
            actionLogItems:[] // store add, sub actionLogItems as arrays of [functionName, function, parameter]. E.g., [['add', sub(), 5], ['sub',add(), 3]...]
        };
    }

    handleTextChange = (event) => {
        this.setState({inputVal: event.target.value});
    }

    addClick = () => {
        const {inputVal, actionLogItems: logItems} = this.state;
        const toAdd = Number(inputVal);
        this.add(toAdd);                
        this.logAction(CounterCalc.addFuncName, this.sub, toAdd);
    }

    add = (val) => {
        this.setState(preState => ({sum: preState.sum + val}));
    }

    static addFuncName = "Add"

    subClick = () => {
        const {inputVal, actionLogItems: logItems} = this.state;
        const toSub = Number(inputVal);
        this.sub(toSub);
        this.logAction(CounterCalc.subFuncName, this.add, toSub);
    }

    add = (val) => {
        this.setState(preState => ({sum: preState.sum + val}));
    }    

    sub = (val) => {
        this.setState(preState => ({sum: preState.sum - val}));
    }

    static subFuncName = "Substract"

    logAction = (funcName, funcInstance, param) => {
        const {actionLogItems: logItems} = this.state;

        const copyLogItems = [...logItems];

        copyLogItems.push(new LogItem(funcName, funcInstance, param));
        this.setState({actionLogItems: copyLogItems});
    }

    revertAction = (index) => (e) => {
        const {actionLogItems: logItems} = this.state;

        const logItem = logItems[index];

        const {funcName, funcInstance, param} = logItem;    

        console.log(funcName + "(" + param + ") is reverted");

        // revert the action
        funcInstance(param);

        // remove the log item in this.state.actionLogItems
        const copyLogItems = [...logItems];
        copyLogItems.splice(index, 1);
        this.setState({actionLogItems: copyLogItems});
    }

    render() {
        const { sum, inputVal, actionLogItems } = this.state;

        return (
            <div>
                <input type="text" value={inputVal} onChange={this.handleTextChange} ref={(input) => { this.textInput = input; }}></input>
                <button title="+" onClick={this.addClick}>+</button>
                <button title="-" onClick={this.subClick}>-</button>
                <OutputFormatter sum={sum}></OutputFormatter>
                <br /><br />
                <LogListBuilder actionLogItems={actionLogItems} revertAction = {this.revertAction}></LogListBuilder>
            </div>
        );
    }
}

module.exports = App;