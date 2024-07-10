import React from 'react';

const CENTER = {x: 30, y: 30};


class Note extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        toneState: props.value
      };
      this.select = this.select.bind(this);
    }
  
    select(event) {
        event.stopPropagation();
        event.preventDefault();
        
        this.props.onClick(this.props.value);
     }    
  
    cacluatePointOnCircle(deg, radius) {
      // 𝑥=𝑟 sin𝜃, 𝑦 = 𝑟 cos𝜃.
      const piFactor = (Math.PI / 180);
      const rad = deg * piFactor;
      return { 
          x: Math.cos(rad) * radius, 
          y: Math.sin(rad) * radius
      };
    }

    createLinesAlongCurve(startDeg, endDeg, radius) {
        const deltaDeg = 5;
        let data = "M " + CENTER.x + " " + (this.props.scales.length > 1 ? CENTER.y : CENTER.y - radius) + " \n";
        for(let i = startDeg; i < (endDeg + deltaDeg); i = i + deltaDeg) {
            const deg = Math.min(i, endDeg);
            const p = this.cacluatePointOnCircle(deg, radius);
            let x = CENTER.x + p.x;
            let y = CENTER.y + p.y;
            data += " L " + x + " " + y + " \n";
        }
        return data + " z";
    }

    createPath() {
        return ;
    }

    render() {
      const scaleCount = this.props.scales.length;
      const radius = 30;
      const pieSizeInDegs = scaleCount > 0 ? 360 / scaleCount : 0;
      const isUse = this.state.toneState.usedIn.size > 0;
      let pos = 0;
            
      let activeScale = undefined;
      let nextScale = undefined;
      
      // calculate how many degrees we should draw the circle
      let degrees = this.props.beat ? (this.props.beat.getTick() / this.props.beat.getTicksPerBeat()) * 360 : 0;
      

      for (let i = 0; !activeScale && i < this.props.scales.length; i += 1) {
        let next = this.props.scales[i];
        if (next.enabled && this.state.toneState.isUsedInScale(next)) {
          activeScale = next;
          if (i + 1 < this.props.scales.length) {
            let comingScale = this.props.scales[i + 1];
            if (this.state.toneState.isUsedInScale(comingScale)) {
              nextScale = comingScale;
            }
          }
        }
      }
          
      
      //console.log(activeScale, nextScale);

      return (
          <div
            id={this.props.id}
            key={this.props.id}
            onClick={this.select}
            className={"note " + (this.props.isInKey ? "inKey" : "outOfKey")}>
                
            <svg>
                {/* {this.props.scales.map(nextScale => {
                        pos = pos + 1;
                        const showMe = this.state.toneState.isUsedInScale(nextScale); //usedIn.find(n => n.uid === nextScale.uid) !== undefined
                        if (isUse && showMe) {
                          const intLabel = this.state.toneState.getIntervalLabel(nextScale);
                          const startDeg = (pos - 1) * pieSizeInDegs - 90;
                          const endDeg = pos * pieSizeInDegs - 90;

                          const p = this.cacluatePointOnCircle((endDeg + startDeg) / 2, radius + radius/2);
                          return (
                            <g key={this.props.id + "." + pos}>
                              <path fill={ nextScale.color } 
                                    opacity={nextScale.enabled ? 1.0 : 0.25 } 
                                    stroke="black" 
                                    d={this.createLinesAlongCurve(startDeg, endDeg, radius * 0.85)} />
                              <text x={CENTER.x + p.x} y={CENTER.y + p.y} fontSize="10" 
                                    stroke={nextScale.enabled ? "white" : "black" } 
                                    dominantBaseline="central" 
                                    textAnchor="middle">{intLabel}</text>
                            </g>
                          );
                        }
                        return ("<path />");
                })} */}

               {activeScale && (
                  <g key={this.props.id + "." + pos}>
                      <path fill={ activeScale.color } 
                            opacity={activeScale.enabled ? 1.0 : 0.25 } 
                            stroke="black" 
                            d={this.createLinesAlongCurve(90 - degrees, 270, radius * 0.85)} />
                  </g>)}

                <circle className="centerCircle" key={this.props.id + "circle"} 
                    cx={CENTER.x} cy={CENTER.y} r={radius/2}/>
                
                <text key={this.props.id + "text"} className="centerLabel" x={CENTER.x} y={CENTER.y} 
                    dominantBaseline="central" 
                    textAnchor="middle">{this.props.value.name}</text>
            </svg>
          </div>);
    }
  }

  export default Note;