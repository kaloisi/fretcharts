import './css/Fretboard.css';

import React from 'react';
import GuitarString from './GuitarString.js';
import Scale from './Scale.js';
import SelectBox from './ui/SelectBox';
import Utils from './utils';
import GuitarState from './models/GuitarState';
import Metronome from './Metronome';
import DocParamMap from './models/DocParamMap.js';


class Fretboard extends React.Component {
  constructor(props) {
    super(props);
    const guitarState = new GuitarState();

    let urlParams = new DocParamMap();
    let keyName = urlParams.getValue("key");
    let key = keyName && Utils.KEYS[keyName] ? Utils.KEYS[keyName] : Utils.KEYS.C_MAJOR;

    
    let savedScales = urlParams.getValues("s");
    if (savedScales && savedScales.length > 0) {
      for (let i = 0; i < savedScales.length; i += 1) {
        if (savedScales[i]) {
          let args = savedScales[i].split(".");
          if (args.length === 3) {
            let stringNum = Number.parseInt(args[0]);
            let fretNum = Number.parseInt(args[1]);
            let positionNum = Number.parseInt(args[2]);

            let scalePattern = guitarState.createScalePatternAt(stringNum, fretNum);
            let positions = Utils.getPositionsForString(stringNum);
            if (positionNum < positions.length) {
              scalePattern.setPosition(positions[positionNum]);
            }

            //console.log("Loading Scale ", scalePattern);
          }
        }
      }
    }
    
    let p = urlParams.getValuesAsInts("p", []);
    this.state = {
      key: key,
      scales: guitarState.scales,
      guitarState: guitarState,
      progression: p,
      bpm: urlParams.getValueAsInt("bpm", 60),
      bpb: urlParams.getValueAsInt("bpb", 4),
      tpb: urlParams.getValueAsInt("tpb", 2),
      volume: urlParams.getValueAsInt("v", 6)
    };
  }

  onBeatStop() {
    this.state.guitarState.setActiveScale(undefined);
    this.reloadGuitarState();
  }

  onBeatChange(beat) {
    let scales = this.state.guitarState.scalePatterns;
    let idx = beat.getBar();
    // console.log("Bar = " + beat.getBar() + " Idx=" + idx);
    let active = scales[idx % scales.length];
    this.state.guitarState.setActiveScale(active);
    this.reloadGuitarState();
  }

  reloadGuitarState() {
    this.setState({
      guitarState: this.state.guitarState
    });
  }

  /** change the key (notes that are highlighted) */
  updateKey(newKey) {
    this.setState({
      key: newKey
    })
  }

  /** delete a scale from the table */
  deleteScale(scale) {
    this.state.guitarState.deleteScalePattern(scale);
    this.reloadGuitarState();
  }

  /** chnage the position for a eventScale position */
  updatePosition(scale, newPosition) {
    console.log("Swap Position", newPosition, scale);
    scale.setPosition(newPosition);
    this.reloadGuitarState();
  }

  addToProgression(scale) {
    let rowNum = this.state.guitarState.getRowNumberForScale(scale);
    if (rowNum >= 0) {
      let progression = this.state.progression;
      progression[progression.length] = rowNum;
      this.setState({
        progression: progression
      });
    }
  }


  /** add a new ScalePattern when click on bottom 3 strings */
  onNoteClick(toneState) {
    let newScale = this.state.guitarState.createScalePatternAt(toneState.stringNumber, toneState.fret);
    console.log("Scale Added", newScale);
    this.reloadGuitarState();
  }

  /** click on/off a particalur scale */
  onCheck(scale) {
    scale.enabled = !scale.enabled;
    this.setState({
       scales: this.state.scales
    });
  }

  render() {
    const fretCount = this.state.guitarState.strings[0].tones.length;
    const allKeys = Object.values(Utils.KEYS);

    const fretMarkers = [];
    for(let i=0; i < fretCount; i++) {
      let dots = "";
      if (i === 3 || i === 5 || i === 7 || i === 9 || i === 15 || i === 17 || i === 19 || i === 21) {
        dots += '●';
      } else if (i === 12) {
        dots += '●●';
      }

      fretMarkers.push((<div key={"fretMarker" + i} className="fret-marker">{dots}</div>));
    }

    let scales = this.state.guitarState.scalePatterns;
    
    return (
      <div>
        <div className="keySelector">
            <SelectBox 
               key="keySelector"
               label="Key" 
               onChange={(e) => this.updateKey(e)}
               options={allKeys}
               value={this.state.key} />

            <Metronome scales={scales} 
               bpb={this.state.bpb} 
               bpm={this.state.bpm}
               tpb={this.state.tpb}
               volume={this.state.volume}
               progression={this.state.progression} 
               onBeatChange={(beat) => this.onBeatChange(beat)}
               onStop={() => this.onBeatStop()}
               />
        </div>
        
        <div className="fret-board">{
          this.state.guitarState.strings.map((stringState) => {
            return (
                  <GuitarString 
                      key={stringState.uid}
                      musicKey={this.state.key} 
                      value={stringState} 
                      onClick={(g,f,n) => this.onNoteClick(g, f, n)} 
                      scales={scales}
                  />
            )})
        }
          <div className="fret-markers">{fretMarkers}</div>
        </div>
        
        <div className="scaleTable">
          <div>
            <div>Color</div>
            <div>Root</div>
            <div>Position</div>
            <div>...</div>
          </div>
          {
            scales.map((item) => (
              <Scale key={item.uid}
                onDelete={(e) => this.deleteScale(e)}
                onChange={(scale, newPosition) => this.updatePosition(scale, newPosition)}
                onCheck={(s) => this.onCheck(s)}
                addToProgression={(scale) => this.addToProgression(scale)}
                value={item} />
          ))
        }</div>
      </div>
    );
  }
}


export default Fretboard;
