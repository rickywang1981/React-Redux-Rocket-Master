import React, {Component} from 'react';

export default class LogItem {
    constructor(funcName, funcInstance, param) {
        this.funcName = funcName;
        this.funcInstance = funcInstance;
        this.param = param;
    }
}

export class LogListBuilder extends Component {
    constructor() {
        super();
    }

    buildLogList(actionLog) {
        const itemList = actionLog.map((action, index) => {
            return <li key={index} onClick={this.props.revertAction(index)}>{action.funcName}({action.param})</li>
        });

        return (
            <ul>{itemList}</ul>
        );
    }


    render() {
        const {actionLogItems} = this.props;

        return (
            <div>
            <div>Action Log:</div>
            {this.buildLogList(actionLogItems)}
            <div>Click an action item to revert it</div>
            </div>
        )
    }
}