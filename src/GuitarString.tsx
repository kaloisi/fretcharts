import React from 'react';
import Note from './Note';
import { StringState, ToneState } from './models/GuitarState';
import Beat from './models/Beat';
import Scale from './Scale';
import {Utils, MusicKey } from './utils'
  
  interface GuitarStringProps {
    value: StringState;
    beat?: Beat;
    musicKey: MusicKey;
    onClick: (tone: ToneState) => void;
    scales: Scale[];
  }
  
  interface GuitarStringState {
    stringState: StringState;
  }
  
  class GuitarString extends React.Component<GuitarStringProps, GuitarStringState> {
    constructor(props: GuitarStringProps) {
      super(props);
      this.state = {
        stringState: props.value,
      };
    }
  
    render() {
      const notes = [];
      for (let i = 0; i < this.state.stringState.tones.length; i++) {
        const tone = this.state.stringState.tones[i];
        const isInKey = this.props.musicKey.tones.find((e) => e === tone.name) !== undefined;
  
        notes.push(
          <Note
            id={tone.uid}
            beat={this.props.beat}
            key={tone.uid}
            onClick={this.props.onClick}
            isInKey={isInKey}
            scales={this.props.scales}
            value={tone}
          />
        );
      }
  
      return <div className="string">{notes}</div>;
    }
  }
  
  export default GuitarString;