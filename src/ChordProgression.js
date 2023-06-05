import React from 'react';

class ChordProgression extends React.Component {

    renderProgression() {
        let prog = [];
        let scales = this.props.scales;
        let progression = this.props.progression;
        let currentBar = Math.floor(this.props.count / this.props.bpb) % scales.length;

        for(let i =0; i < progression.length; i += 1) {
            let scale = scales[ progression[i] ];
            prog[prog.length] = scale;
        }

        console.log("Progression", prog);
        return prog.map((k,i) => {
            const active = i === currentBar; 
            const style = {
                backgroundColor: k.color,
                opacity: (active) ? 1 : 0.25
            }
            return (<div className="pill" key={'c' + i} style={style}>{k.name}</div>);
        });
    }

    render() {
      return (
        <div key="progression" className="progressions">{this.renderProgression()}</div>
      );
    }
  }

  export default ChordProgression;