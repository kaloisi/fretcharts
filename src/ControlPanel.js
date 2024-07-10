import React from 'react';
import Utils from './utils';
import ChordProgression from './ChordProgression';
import Beat from './models/Beat';
import AudioFiles from './models/AudioFiles';
import SelectBox from './ui/SelectBox';
import IntSelectBox from './ui/IntSelectBox';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from './ui/Button';
import { Stack } from '@mui/material';
const audioFiles = AudioFiles;

export default class Metronome extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.musicKey);
        this.state = {
            musicKey: this.props.musicKey,
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

    setKey(key) {
        if (this.props.onKeyChange) {
            this.props.onKeyChange(key);
        }
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
                res.push((<span key={"r" + r} className={css}>{beat.getTickLabel(r)}</span>));
            }
        }
        return res;
    }

    render() {
        const allKeys = Object.values(Utils.KEYS);
        return (
        <Stack component="section" alignItems="center">
            <ButtonGroup variant="contained" size="small">
                <SelectBox 
                    key="keySelector"
                    label="Key" 
                    onChange={(e) => this.setKey(e)}
                    options={allKeys}
                    value={this.state.musicKey} />

                <IntSelectBox label="Counting"
                    options={[1, 2, 3, 4]}
                    labels={["Quater Notes", "8th Notes", "Triplets" , "16th Notes"]}
                    value={this.state.tpb}
                    onChange={(val) => this.updateState("tpb" , val)}
                />

                <IntSelectBox label="Swing"
                    options={[true, false]}
                    labels={["Yes", "No"]}
                    value={this.state.swing}
                    onChange={(val) => this.updateState("swing" , val)}
                />
                
                <IntSelectBox label="Beats per Bar"
                    options={[2,3,4,5,6,8]}
                    value={this.state.bpb}
                    onChange={(val) => this.updateState("bpb" , val)}
                />

                <IntSelectBox label="Beats per minute"
                    options={[40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140]}
                    value={this.state.bpm}
                    onChange={(val) => this.updateState("bpm" , val)}
                />

                <SelectBox label="Audio"
                    options={audioFiles}
                    value={this.state.audioFiles}
                    onChange={(e) => this.setAudioFiles(e)}
                />

                <IntSelectBox label="Volume"
                    options={[4,10]}
                    labels={["Low", "High"]}
                    value={this.state.volume}
                    onChange={(val) => this.updateState("volume" , val)}
                />
                
                <Button 
                    onClick={(e) => this.startStop()}
                    label={this.state.playing ? 'Stop' : 'Play'}
                />
                
                <div className='counter'> {this.state.beat && this.renderTicks()} </div>
            </ButtonGroup>

            <ChordProgression
                scales={this.props.scales} 
                progression={this.props.progression}
                beat={this.state.beat} 
                bpb={this.state.bpb}
                bpm={this.state.bpm}
                />
        </Stack>
        );
    }
}
