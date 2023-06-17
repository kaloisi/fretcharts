import React from 'react';
import ChordProgression from './ChordProgression';
import Beat from './models/Beat';
import AudioFiles from './models/AudioFiles';
import SelectBox from './SelectBox';

const audioFiles = AudioFiles;

export default class Metronome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bpm: this.props.bpm,
            bpb: this.props.bpb,
            tpb: this.props.tpb,
            swing: this.props.tpb === 2 ? false : undefined,
            volume: this.props.volume,
            playing: false,
            interval: null,
            beat: undefined,
            audioCtx: undefined,
            audioOut: undefined,
            audioFiles: audioFiles[0]
        };
    }

    beep() {
        try {
            let audioCtx = this.state.audioCtx;
            if (audioCtx === undefined) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }

            var source = audioCtx.createBufferSource();
            var audioOut = this.state.audioOut;
            if (!audioOut) {
                audioOut = audioCtx.createGain();
                audioOut.connect(audioCtx.destination);
            }

            var beat = this.state.beat;
            if (!beat) {
                beat = new Beat(this.state.bpm, this.state.bpb, this.state.tpb)
            } else {
                beat.tick();
            }

            let gain = (this.state.volume);
            if (beat.getTick() === 0) {
                if (beat.getBeat() !== 0) {
                    gain /= 2;
                }
            } else {
                gain /= 4;
            }
            //console.log(gain);
            audioOut.gain.value = gain / 10;
            source.buffer = this.state.audioFiles.getAudioFile(beat.getTickLabel(beat.getTick()));
            source.connect(audioOut); 
            source.start();
            
            if (this.props.onBeatChange) {
                this.props.onBeatChange(beat)
            }

            this.setState({
                beat: beat,
                audioOut: audioOut,
                audioCtx: audioCtx
            });
        } catch(e) {
            console.log("Error", e);
        }
    }

    doneLoading() {
        console.log("Done Loading");
    }


    getNextTickInMs() {
        let p = 0.75;
        let tickInMs = (60000 / this.state.bpm);
        if (this.state.tpb === 2 && this.state.swing && this.state.beat) {
            if (this.state.beat.getTick() === 0) {
                tickInMs *= p;
            } else {
                tickInMs *= 1 - p;
            }
        } else {
            tickInMs /= this.state.tpb;
        }
        return tickInMs;
    }

    scheduleTick(keepGoing, first) {
        if (!first) {
            this.beep();
        }
        
        if (keepGoing) {
            let nextTickInMs = this.getNextTickInMs();
            //console.log("Run in: " + nextTickInMs);
            setTimeout(() => this.scheduleTick(this.state.playing), nextTickInMs);
        }
    }


    startStop() {
        const newVal = ! this.state.playing;
        if (!newVal && this.props.onStop) {
            this.props.onStop();
        } 
        
        if (newVal) {
            this.scheduleTick(newVal, true);
        }

        this.setState({
            beat: undefined,
            playing: newVal,
        });
    }

    setBpm(e) {
        const newBpm = Number.parseInt(e.target.value)
        this.setState({
            bpm: newBpm
        });
        console.log("BPM = " + newBpm);
    }

    setBpb(e) {
        this.setState({
            bpb: Number.parseInt(e.target.value)
        })
    }

    setTpb(e) {
        let value = Number.parseInt(e.target.value);
        let enabled = value === 2 ? false : undefined;
        console.log("New Tpb=" + value + " " + enabled)
        this.setState({
            tpb: value,
            swing: enabled
        })
    }

    setVolume(e) {
        this.setState({
            volume: Number.parseInt(e.target.value)
        })
    }

    updateState(field, value) {
        let newState = {};
        newState[field] = value;
        this.setState(newState);
    }

    setSwing(e) {
        this.setState({
            swing: e.target.value
        })
    }

    setAudioFiles(e) {
        this.setState({
            audioFiles: e
        })
    }

    renderTicks() {
        let res = [];
        let beat = this.state.beat;
        if (beat) {
            for (let r = 0; r < beat.getTicksPerBeat(); r += 1) {
                let css = beat.getTick() === r ? "counterOn" : "counterOff";
                res.push((<div key={"r" + r} className={css}>{beat.getTickLabel(r)}</div>));
            }
        }
        return res;
    }

    render() {
        let beatPerBarOptions = [
            {value: 2, name:'2'},
            {value: 3, name:'3'},
            {value: 4, name:'4'},
            {value: 5, name:'5'},
            {value: 6, name:'6'},
            {value: 8, name:'8'},
        ];

        return (
        <div>
            <div className='metronome'>
                <div className='label'>Tick per beat</div>
                <input type='number' min={1} max={4} size={6} maxLength={6} defaultValue={ this.state.tpb } onChange={(e) => this.setTpb(e)}/>
                
                <div className='label'>Swing</div>
                <input type='checkbox' defaultValue={this.state.swing} disabled={this.state.swing === undefined } onChange={(e) => this.setSwing(e)}/>
                
                <div className='label'>Beats per bar</div>
                <input type='number' min={2} max={8} size={6} maxLength={6} defaultValue={ this.state.bpb } onChange={(e) => this.setBpb(e)}/>
                
                <SelectBox label="Beats per bar"
                    options={beatPerBarOptions}
                    value={this.state.bpb}
                    onChange={(e) => this.updateState("bpb" , e.value)}
                />


                <div className='label'>Beats per minute</div>
                <input type='number' min={1} max={200} size={6} maxLength={6} defaultValue={ this.state.bpm } onChange={(e) => this.setBpm(e)}/>
                
                <SelectBox label="Audio"
                    options={audioFiles}
                    value={this.state.audioFiles}
                    onChange={(e) => this.setAudioFiles(e)}
                />

                <div className='label'>Volume</div>
                <select defaultValue={this.state.volume} onChange={(e) => this.setVolume(e)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                </select>
                


                <button onClick={(e) => this.startStop()}>{this.state.playing ? 'Stop' : 'Play'}</button>

                <div className='counter'> {this.state.beat && this.renderTicks()} </div>
            </div>

            <ChordProgression
                scales={this.props.scales} 
                progression={this.props.progression}
                beat={this.state.beat} 
                bpb={this.state.bpb}
                bpm={this.state.bpm}
                />
        </div>
        );
    }
}
