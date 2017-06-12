import React from 'react';

export function OutputFormatter(props) {
     return (
        <span> = {props.sum}</span>
     );
}

/*
class OutputFormatter extends Component {
    render() {
        return (
            <span> = {this.props.sum}</span>
        );
    }
}
*/