import './css/Fretboard.css';

import React from 'react';
import GuitarString from './GuitarString.js';
import Scale from './Scale.js';
import SelectBox from './SelectBox';
import Utils from './utils';
import GuitarState from './models/GuitarState';


const SCALE_COLORS = ["#4E79A5", "#F18F3B", "#E0585B", "#77B7B2", "#5AA155", "#EDC958", "#AF7AA0", "#FE9EA8", "#9C7561", "#BAB0AC"];

class Fretboard extends React.Component {
  constructor(props) {
    super(props);
    const guitarState = new GuitarState();

    this.state = {
      key: Utils.KEYS.C_MAJOR,
      scales: [],
      guitarState: guitarState
    };
  }

  updateKey(newKey) {
    this.setState({
      key: newKey
    })
  }

  deleteScale(scale) {
    let scales = this.state.scales;
    scale.notes.forEach(n => n.deselect(scale));

    //usedIn = scale.usedIn.filter(n => n.uid !== scale.uid);
    this.setState({
      scales: scales.filter(n => n.uid !== scale.uid)
    });
  }

  updatePosition(scale, newPosition) {
    console.log("Swap Position", newPosition, scale);
    let scales = this.state.scales;
    scale.notes.forEach(n => n.deselect(scale));

    const notes = Utils.resolveNotesForScale(
      this.state.guitarState,
      scale.toneState.fret, 
      newPosition);

    scale.notes = [];
    notes.forEach((interval, note) => {
      note.select(scale, interval);
      scale.notes.push(note);
    });

    this.setState({
      scales: scales
    });
  }


  resolveNotesForScale(scale) {
    const stringNumber = scale.toneState.stringNumber;
    
    const availablePositions = Utils.getPositionsForString(stringNumber);
    if (availablePositions === undefined || availablePositions.length < 1) {
      return [];
    }

    const defaultPos = availablePositions.find(n => n.default === true);
    scale.position = defaultPos ? defaultPos : availablePositions[0];
    return Utils.resolveNotesForScale(
      this.state.guitarState,
      scale.toneState.fret, 
      scale.position);
  }

  onClick(toneState) {
    const newScales = this.state.scales;
        
    const color = SCALE_COLORS[newScales.length % SCALE_COLORS.length];
    let newScale = {
        uid: "scale." + toneState.stringNumber + "." + toneState.fret + "." + newScales.length,
        name: toneState.name,
        fret: toneState.fret,
        toneState: toneState,
        scale: Utils.KEYS.C_MAJOR,
        color: color,
        enabled: true
    };

    const notes2intervals = this.resolveNotesForScale(newScale);
    console.log(notes2intervals, notes2intervals.keys);

    if (notes2intervals.size > 0) {
      newScale.notes = [];
      notes2intervals.forEach((interval, note) => {
        console.log(note);
        newScale.notes.push(note);
        note.select(newScale, interval);
      });
      newScales.push(newScale);
  
      //console.log(newScales);
      this.setState({
         scales: newScales
      });
    }
  }

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
      fretMarkers.push((<div key={"fretSpacer" + i} className="fret-spacer"></div>));
    }

    return (
      <div>
        <div className="keySelector">
            <SelectBox 
               key="keySelector"
               label="Key" 
               onChange={(e) => this.updateKey(e)}
               options={allKeys}
               value={this.state.key}/>
            
        </div>

        <div className="fret-board">{
          this.state.guitarState.strings.map((stringState) => {
            return (
                  <GuitarString 
                      key={stringState.uid}
                      musicKey={this.state.key} 
                      value={stringState} 
                      onClick={(g,f,n) => this.onClick(g, f, n)} 
                      scales={this.state.scales}
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
            this.state.scales.map((item) => (
              <Scale key={item.uid}
                onDelete={(e) => this.deleteScale(e)}
                onChange={(scale, newPosition) => this.updatePosition(scale, newPosition)}
                onCheck={(s) => this.onCheck(s)}
                value={item} />
          ))
        }</div>
      </div>
    );
  }
}


export default Fretboard;
