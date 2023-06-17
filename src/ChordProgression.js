import React from 'react';

class ChordProgression extends React.Component {


    getScales() {
        let prog = [];
        let scales = this.props.scales;
        let progression = this.props.progression;
        for(let i =0; i < progression.length ; i += 1) {
            let pIdx = progression[i];
            if (pIdx < scales.length) {
                let scale = scales[pIdx];
                prog[prog.length] = scale;
            }
        }
        return prog;
    }

    renderProgression() {
        let prog = this.getScales();
        let beat = this.props.beat;
        let currentBar = beat ? beat.getBar() % prog.length : undefined;
        return prog.map((k,i) => {
            const active = i === currentBar; 
            const style = {
                backgroundColor: k.color,
                opacity: (active) ? 1 : 0.25
            }
            let dots = '';
            if (active) {
                let beat = (this.props.count % this.props.bpb) + 1;
                for (let b = 0; b < beat; b += 1) {
                    dots += '.';
                }
            }
            return (<div className="pill" key={'c' + i} style={style}>
                {k.name + k.position.abr} {dots}
            </div>);
        });
    }

    render() {
      return (
        <div key="progression" className="chordProgressions">
            <div className="progressions">{this.renderProgression()}</div>
        </div>
      );
    }
  }

  export default ChordProgression;