import React from 'react';
import { SelectBox } from './ui/SelectBox';
import Utils from './utils';
import TableRow from '@mui/material/TableRow';
import { TableCell } from '@mui/material';
import Button from './ui/Button';

class Scale extends React.Component {
   

    delete() {
        if (this.props.onDelete) {
            this.props.onDelete(this.props.value);
        }
    }

    select(newPosition) {
        if (this.props.onChange) {
            this.props.onChange(this.props.value, newPosition);
        }
    }

    onCheck(evt) {
        if (this.props.onCheck) {
            this.props.onCheck(this.props.value);
        }
    }
    
    addToProgression() {
        if (this.props.addToProgression) {
            this.props.addToProgression(this.props.value);
        }   
    }

    render() {
        const url = 'https://onlineguitarbooks.com/' + this.props.value.name + '-chord/';

        const style = {
            backgroundColor: this.props.value.color
        };
        const options = Utils.getPositionsForString(this.props.value.toneState.stringNumber);
        
        return (
            <TableRow>
                <TableCell style={style}></TableCell>
                <TableCell>
                    <input type="checkbox" checked={this.props.value.enabled} onChange={(e) => this.onCheck(e)}/>
                    <a href={url} target="_blank" rel="noreferrer">
                    {this.props.value.name} ({this.props.value.toneState.stringNumber + 1}, {this.props.value.toneState.fret})
                    </a>
                </TableCell>
                <TableCell>
                    <SelectBox
                        value={this.props.value.position}
                        options={options}
                        onChange={(e) => this.select(e)}
                    />
                </TableCell>
                <TableCell>
                    <Button 
                        onClick={(e) => this.delete()}
                        label="Delete"
                        />
                    <Button 
                        onClick={(e) => this.addToProgression()}
                        label="Add to chord progression"
                        />
                </TableCell>
            </TableRow>
        );
    }
}

export default Scale;