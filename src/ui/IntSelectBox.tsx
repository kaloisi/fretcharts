import React from 'react';
import { SelectBox, Option } from './SelectBox';

function createOptions(values: number[], labels ?: string[]) : Pair[] {
    return values.map((val, idx) => {
        return {
            name: labels ? labels[idx] : '' + val, 
            value: val
        } as Pair;
    });
}

interface Pair extends Option<number> {}

interface IntSelectBoxAttrs {
    label: string,
    value ?: number,
    values: number[],
    labels ?: string[]
    onChange: (a ?: number) => void;
}
interface IntSelectBoxState {
    value ?: Pair,
    values: Pair[]
}

export class IntSelectBox extends React.Component<IntSelectBoxAttrs, IntSelectBoxState> {

    constructor(props: IntSelectBoxAttrs) {
        super(props);

        let values = createOptions(props.values, props.labels);
        let value = values.find(i => i.value === props.value);
        this.state = {
            values: values,
            value: value
        };
    }

    selectOption(newValue : Pair | undefined) {
        this.setState({
            value: newValue
        });

        this.props.onChange(newValue ? newValue.value : undefined);
    }

    render() {
        return (
            <SelectBox
                label={this.props.label}
                options={this.state.values}
                value={this.state.value}
                onChange={(v) => this.selectOption(v)}
            />
        );
    }
}
