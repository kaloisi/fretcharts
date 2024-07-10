import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

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
        //console.log(this.state);
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
        this.state.options.forEach((element, i) => {
            children.push((
                <MenuItem key={element.name} value={element.name}>{element.name}</MenuItem>
            ))
        });

        return (
            <FormControl variant="filled" size="small">
                <InputLabel id="demo-simple-select-helper-label">{this.props.label}</InputLabel>
                <Select 
                    label={this.props.label}
                    onChange={ (e) => this.selectOption(e) } 
                    value={this.state.value && this.state.value.name}>
                        {children}
                </Select>
            </FormControl>
        );
    }
}

export default IntSelectBox;