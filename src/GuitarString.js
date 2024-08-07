import React from 'react';
import Note from './Note.js';

class GuitarString extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        stringState: props.value
      };
    }
  
    render() {
      const notes = [];
      for (let i=0; i < this.state.stringState.tones.length; i++) {
        const tone = this.state.stringState.tones[i];
        const isInKey = this.props.musicKey.tones.find(e => e === tone.name);
        notes.push((
          <Note
            beat={this.props.beat}
            key={tone.uid}
            onClick={this.props.onClick}
            isInKey={isInKey}
            scales={this.props.scales}
            value={tone}
            /> 
        ));
      }

      return (<div className="string">{notes}</div>);
    }
  }

  export default GuitarString;