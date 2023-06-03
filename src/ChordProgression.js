import React from 'react';

class ChordProgression extends React.Component {

    getBarCount() {
        let count = 0;
        // for(let i = 0 ; i < this.props.scales.length; i += 1) {
        //     count += this.props.scales[i].progression.length;
        // }
        return count;
    }

    getBar() {
        return 0;
    }

    renderProgression() {
        let prog = [];
        
        let scales = this.props.scales;
        let progression = this.props.progression;

        for(let i =0; i < progression.length; i += 1) {
            let scale = scales[ progression[i] ];
            prog[prog.length] = scale;
        }

        console.log("Progression", prog);
        let currentBar = this.getBar();
        return prog.map((k,i) => {
            const style = {
                backgroundColor: k.color,
                opacity: (i === currentBar) ? 1 : 0.25 
            }
            return (<div className='pill' key={'c' + i} style={style}>{k.name}</div>);
        });
    }

    render() {
      return (
        <div key="progression" className="progressions">{this.renderProgression()}</div>
      );
    }
  }

  export default ChordProgression;