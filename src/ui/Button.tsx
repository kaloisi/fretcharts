import React from 'react';
import MButton from '@mui/material/Button';


interface ButtonAttrs {
    label: string,
    onClick: () => void
}

interface ButtonState {

}


class Button extends React.Component<ButtonAttrs, ButtonState>{

    render() {
        return (
            <MButton 
            variant='contained'
            size='small'
            onClick={(e) => this.props.onClick()}
            >{this.props.label}</MButton>
        );
    }
}

export default Button;