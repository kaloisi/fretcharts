import React from 'react';

class SelectBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    selectOption(e) {
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
            <select onChange={ (e) => this.selectOption(e) } defaultValue={this.state.value.name} >
                    {children}
            </select>
            <div className="selectBoxLabel">{this.props.label}</div>
        </div>);
    }
  }

export default SelectBox;