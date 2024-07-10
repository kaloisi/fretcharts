import React from 'react';
import MButton from '@mui/material/Button';

class Button extends React.Component {

    render() {
        return (
            <MButton 
            variant='contained'
            size='small'
            onClick={this.props.onClick}
            >{this.props.label}</MButton>
        );
    }
}

export default Button;