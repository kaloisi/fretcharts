
import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';


class SelectBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    selectOption(e: SelectChangeEvent) {
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
                <MenuItem value={element.name}>{element.name}</MenuItem>
            ))
        });

        return (
        <FormControl variant="filled" size="small">
            <InputLabel>{this.props.label}</InputLabel>
            <Select
                label={this.props.label} 
                onChange={ (e) => this.selectOption(e) }
                value={this.state.value.name} >
                    {children}
            </Select>
        </FormControl>);
    }
  }

export default SelectBox;