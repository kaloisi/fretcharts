import React from 'react';
import Scale from './Scale'
import Beat from './models/Beat';


interface ChordProgressionProps {
  scales: Scale[];
  progression: number[];
  beat?: Beat;
  count: number;
  bpb: number;
  bpm: number;
}

interface ChordProgressionState {}

class ChordProgression extends React.Component<ChordProgressionProps, ChordProgressionState> {

  getScales(): Scale[] {
    const prog: Scale[] = [];
    const { scales, progression } = this.props;
    for (let i = 0; i < progression.length; i += 1) {
      const pIdx = progression[i];
      if (pIdx < scales.length) {
        const scale = scales[pIdx];
        prog.push(scale);
      }
    }
    return prog;
  }

  renderScale(
    k : Scale, 
    i : number, 
    currentBar: number | undefined, 
    count: number
  ) {
    const active = i === currentBar;
    const style = {
      backgroundColor: k.getColor(),
      opacity: active ? 1 : 0.25
    };

    let dots = '';
    if (active) {
      const beatNum = (count % this.props.bpb) + 1;
      for (let b = 0; b < beatNum; b += 1) {
        dots += '.';
      }
    }
    const id = "c" + i;
    
    return (
      <div key={id}>
        {k.props.value.name + k.props.value.position.abr} {dots}
      </div>
    )
  }

  renderProgression(): JSX.Element[] {
    const prog = this.getScales();
    const { beat, count, bpb } = this.props;
    const currentBar = beat ? beat.getBar() % prog.length : undefined;

    return prog.map((k : Scale, i : number) => {
      return this.renderScale(k, i, currentBar, count)
    });
  }

  render() : JSX.Element {
    return (
      <div key="progression" className="chordProgressions">
        <div className="progressions">
          {this.renderProgression()}
        </div>
      </div>
    );
  }
}

export default ChordProgression;