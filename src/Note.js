import React from 'react';

const CENTER = {x: 50, y: 50};


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
      let className = 'note';
      
      const scaleCount = this.props.scales.length;
      const textColor = this.props.isInKey ? "white" : "#363636";
      const radius = 20;
      const pieSizeInDegs = scaleCount > 0 ? 360 / scaleCount : 0;
      const isUsed = this.state.toneState.usedIn.size > 0;
      let pos = 0;
      
      
      return (
          <div
            id={this.props.id}
            key={this.props.id}
            onClick={this.select}
            className={className}>
                
            <svg>
                {this.props.scales.map(nextScale => {
                        pos = pos + 1;
                        const showMe = this.state.toneState.isUsedInScale(nextScale); //usedIn.find(n => n.uid === nextScale.uid) !== undefined
                        if (isUsed && nextScale.enabled) {
                          const intLabel = this.state.toneState.getIntervalLabel(nextScale);
                          const startDeg = (pos - 1) * pieSizeInDegs - 90;
                          const endDeg = pos * pieSizeInDegs - 90;

                          const p = this.cacluatePointOnCircle((endDeg + startDeg) / 2, radius + radius/2);
                          return (
                            <g key={this.props.id + "." + pos}>
                              <path fill={showMe ? nextScale.color : "transparent"} stroke="black" d={this.createLinesAlongCurve(startDeg, endDeg, radius * 2)} />
                              <text x={CENTER.x + p.x} y={CENTER.y + p.y} fontSize="16" fill="white" dominantBaseline="central" textAnchor="middle">{intLabel}</text>
                            </g>
                          );
                        }
                        return ("<path />");
                })}

                <circle key={this.props.id + "circle"} cx={CENTER.x} cy={CENTER.y} r={radius*2/3} stroke="black" strokeWidth="1" 
                    fill={"black"}/>
                
                <text key={this.props.id + "text"} x={CENTER.x} y={CENTER.y} 
                    fill={textColor}
                    fontSize="20"
                    dominantBaseline="central" textAnchor="middle">{this.props.value.name}</text>
            </svg>
          </div>);
    }
  }

  export default Note;