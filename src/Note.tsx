import React from 'react';
import Scale from './Scale'
import { ToneState } from './models/GuitarState';
import Beat from './models/Beat';

const CENTER = { x: 30, y: 30 };


interface NoteProps {
  id: string;
  value: ToneState;
  beat?: Beat;
  isInKey: boolean;
  onClick: (value: ToneState) => void;
  scales: Scale[];
}

interface NoteState {
  toneState: ToneState;
}

class Note extends React.Component<NoteProps, NoteState> {
  constructor(props: NoteProps) {
    super(props);
    this.state = {
      toneState: props.value,
    };
    this.select = this.select.bind(this);
  }

  select(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    event.preventDefault();
    this.props.onClick(this.props.value);
  }

  cacluatePointOnCircle(deg: number, radius: number) {
    const piFactor = Math.PI / 180;
    const rad = deg * piFactor;
    return {
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius,
    };
  }

  createLinesAlongCurve(startDeg: number, endDeg: number, radius: number) {
    const deltaDeg = 5;
    let data =
      'M ' +
      CENTER.x +
      ' ' +
      (this.props.scales.length > 1 ? CENTER.y : CENTER.y - radius) +
      ' \n';
    for (let i = startDeg; i < endDeg + deltaDeg; i += deltaDeg) {
      const deg = Math.min(i, endDeg);
      const p = this.cacluatePointOnCircle(deg, radius);
      const x = CENTER.x + p.x;
      const y = CENTER.y + p.y;
      data += ' L ' + x + ' ' + y + ' \n';
    }
    return data + ' z';
  }

  createPath(): string | undefined {
    return;
  }

  render() {
    const radius = 30;
    let pos = 0;
    const degrees = this.props.beat
      ? (this.props.beat.getTick() / this.props.beat.getTicksPerBeat()) * 360
      : 0;

    let activeScale: Scale | undefined = undefined;
    for (let i = 0; !activeScale && i < this.props.scales.length; i += 1) {
      const next = this.props.scales[i];
      console.log(next)
      if (this.state.toneState.isUsedInScale(next.props.value)) {
        activeScale = next;
      }
    }

    return (
      <div
        id={this.props.id}
        key={this.props.id}
        onClick={this.select}
        className={"note " + (this.props.isInKey ? 'inKey' : 'outOfKey')}
      >
        <svg>
          {activeScale && (
            <g key={this.props.id + '.' + pos}>
              <path
                fill={activeScale.getColor()}
                opacity={activeScale.isEnabled() ? 1.0 : 0.25}
                stroke="black"
                d={this.createLinesAlongCurve(90 - degrees, 270, radius * 0.85)}
              />
            </g>
          )}

          <circle
            className="centerCircle"
            key={this.props.id + 'circle'}
            cx={CENTER.x}
            cy={CENTER.y}
            r={radius / 2}
          />

          <text
            key={this.props.id + 'text'}
            className="centerLabel"
            x={CENTER.x}
            y={CENTER.y}
            dominantBaseline="central"
            textAnchor="middle"
          >
            {this.props.value.name}
          </text>
        </svg>
      </div>
    );
  }
}

export default Note;
