import { select } from 'async';
import React from 'react';

class SelectBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    select(e) {
        const newValue = this.props.options.find(next => next.name === e.target.value)
        this.setState({
            value: newValue
        });
        this.props.onChange(newValue);
    }

    render() {
        const children = [];

        this.props.options.forEach(element => {
            children.push((
                <option key={element.name}>{element.name}</option>
            ))
        });

        return (<div className="selectBox">
            <div className="selectBoxLabel">{this.props.label}</div>
                <select onChange={(e) => this.select(e)} defaultValue={this.state.value.name} >
                        {children}
                </select>
            </div>);
    }
  }

export default SelectBox;