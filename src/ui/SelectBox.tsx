
import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export interface Option <T>{
    name: string;
    value: T
}

export interface SelectBoxAttrs<T> {
    label: string,
    value ?: T,
    options: T[],
    onChange: (a ?: T) => void;
}

export interface SelectBoxState<T> {
    value ?: T
}

export class SelectBox<V extends any, T extends Option<V>> extends React.Component<SelectBoxAttrs<T>, SelectBoxState<T>> {

    constructor(props : SelectBoxAttrs<T>) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    selectOption(e :SelectChangeEvent) {
        const newValue = this.props.options.find(next => next.name === e.target.value);
        this.setState({
            value: newValue
        });
        this.props.onChange(newValue);
    }

    render() {
        const children = this.props.options.map((element, i) => {
            return (<MenuItem key={element.name} value={element.name}>{element.name}</MenuItem>);
            }
        );

        return (
            <FormControl variant="filled" size="small">
            <InputLabel>{this.props.label}</InputLabel>
            <Select
                label={this.props.label} 
                onChange={ (e) => this.selectOption(e) }
                value={this.state.value ? this.state.value.name : ''} >
                    {children}
            </Select>
            </FormControl>
        );
    }
}
