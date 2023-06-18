import React from 'react';

function createOptions(values, labels) {
    return values.map((val, idx) => {
        return {
            name: labels ? labels[idx] : '' + val, 
            value: val
        };
    });
}

class IntSelectBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.state.options = createOptions(props.options, props.labels);
        this.state.value = this.state.options.find(i => i.value === props.value);
        console.log(this.state);
    }

    selectOption(e) {
        const label = e.target.value;
        const newValue = this.state.options.find(
            next => {
                return next.name === label
            });

        this.setState({
            value: newValue
        });

        this.props.onChange(newValue ? newValue.value : undefined);
    }

    render() {
        const children = [];

        this.state.options.forEach(element => {
            children.push((
                <option key={element.name}>{element.name}</option>
            ))
        });

        return (<div className="selectBox">
            <div className="selectBoxLabel">{this.props.label}</div>
            <select onChange={ (e) => this.selectOption(e) } defaultValue={this.state.value && this.state.value.name} >
                    {children}
            </select>
        </div>);
    }
}

export default IntSelectBox;