import React from 'react';
import Utils from './utils';
import ChordProgression from './ChordProgression';
import Beat from './models/Beat';
import { AudioFiles , AudioLib , AUDIO_REPO } from './models/AudioFiles';
import { SelectBox } from './ui/SelectBox';
import { IntSelectBox } from './ui/IntSelectBox';
import ButtonGroup from '@mui/material/ButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import Button from './ui/Button';
import { FormControl, Stack } from '@mui/material';


interface Props {
    scales: any[],
    progression: any[],
    musicKey: any,
    /** beats-per-minute */
    bpm: number,
    /** beats-per-bar */
    bpb: number,
    /** ticks per beat */
    tpb: number,
    volume: number,
    onBeatChange: (beat:Beat) => {},
    onStop: () => {},
    onKeyChange: (key : any) => {};
}

interface MyState {
    musicKey: any,
    bpm: number,
    bpb: number,
    tpb: number,
    swing : number,
    volume : number,
    playing : boolean,
    beat ?: Beat,
    interval ?: unknown,
    audioFilesIdx : number
}


export default class ControlPanel extends React.Component<Props, MyState> {
    audioCtx ?: AudioContext;
    audioOut ?: GainNode;


    constructor(props: Props) {
        super(props);
        //console.log(this.props.musicKey);
        this.audioCtx = undefined;
        this.state = {
            musicKey: this.props.musicKey,
            bpm: this.props.bpm,
            bpb: this.props.bpb,
            tpb: this.props.tpb,
            swing: 0,
            volume: this.props.volume,
            playing: false,
            interval: undefined,
            beat: undefined,
            audioFilesIdx: 0
        };
    }

    beep() {
        try {
            if (this.audioCtx === undefined) {
                this.audioCtx = new window.AudioContext();
                AUDIO_REPO.init(this.audioCtx);
            }

            if (!this.audioOut) {
                this.audioOut = this.audioCtx.createGain();
                this.audioOut.connect(this.audioCtx.destination);
            }

            var beat = this.state.beat;
            if (!beat) {
                beat = new Beat(this.state.bpm, this.state.bpb, this.state.tpb)
            } else {
                beat.tick();
            }

            let gain = this.state.volume;
            if (beat.getTick() === 0) {
                if (beat.getBeat() !== 0) {
                    gain /= 2;
                }
            } else {
                gain /= 4;
            }
            //console.log(gain);
            this.audioOut.gain.value = gain / 10;

            
            let files = AudioLib[this.state.audioFilesIdx];
            let beatName = beat.getTickLabel();
            
            let auddioBuffer = files.getAudioBuffer(beat.getTickLabel());

            
            if (auddioBuffer) {
                console.log(`Playing ${beatName} of ${files.name}`)
                var source = this.audioCtx.createBufferSource();
                source.connect(this.audioOut); 
                source.buffer = auddioBuffer;
                source.start();
            } else {
                console.log(`Skipping ${beatName} of ${files.name}`, files.files)
            }
            
            if (this.props.onBeatChange) {
                this.props.onBeatChange(beat)
            }

            this.setState({
                beat: beat
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

    scheduleTick(keepGoing: boolean, first: boolean) {
        if (!first) {
            this.beep();
        }
        
        if (keepGoing) {
            let nextTickInMs = this.getNextTickInMs();
            //console.log("Run in: " + nextTickInMs);
            setTimeout(() => this.scheduleTick(this.state.playing, false), nextTickInMs);
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

    setBpm(bpm ?:number) {
        this.setState({
            bpm: bpm ? bpm : 60
        });
    }

    /** beats-per-bar */
    setBpb(bpb ?: number) {
        this.setState({
            bpb: bpb ? bpb : 4
        })
    }

    setTpb(tpb ?: number) {
        this.setState({
            tpb: tpb ? tpb : 2,
            swing: 0
        })
    }

    setVolume(n ?:number) {
        this.setState({
            volume: n ? n : 4
        })
    }

    setSwing(b ?: number) {
        this.setState({
            swing: b ? b : 0
        })
    }

    setKey(key : any) {
        if (this.props.onKeyChange) {
            this.props.onKeyChange(key);
        }
    }

    setAudioFiles(e: AudioFiles) {
        let pos = AudioLib.indexOf(e);
        this.setState({
            audioFilesIdx: pos
        })
    }

    render() {
        const allKeys = Object.values(Utils.KEYS);
        return (
        <Stack component="section" alignItems="center">
            <ButtonGroup variant="contained" size="small">
                <SelectBox 
                    key="keySelector"
                    label="Key" 
                    onChange={(e: any) => this.setKey(e)}
                    options={allKeys}
                    value={this.state.musicKey} />

                <IntSelectBox label="Counting"
                    labels={["Quater Notes", "8th Notes", "Triplets" , "16th Notes"]}
                    value={this.state.tpb}
                    values={[1, 2, 3, 4]}
                    onChange={(val ?:number) => this.setTpb(val)}
                />

                <IntSelectBox label="Swing"
                    values={[1, 0]}
                    labels={["Yes", "No"]}
                    value={this.state.swing}
                    onChange={(val ?: number) => this.setSwing(val)}
                />
                
                <IntSelectBox label="Beats per Bar"
                    values={[2,3,4,5,6,8]}
                    value={this.state.bpb}
                    onChange={(val ?: number) => this.setBpb(val)}
                />

                <IntSelectBox label="Beats per minute"
                    values={[40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140]}
                    value={this.state.bpm}
                    onChange={(val ?: number) => this.setBpm(val)}
                />

                <SelectBox label="Audio"
                    options={AudioLib}
                    value={AudioLib[this.state.audioFilesIdx]}
                    onChange={(e : any) => this.setAudioFiles(e)}
                />

                <IntSelectBox label="Volume"
                    labels={["Low", "High"]}
                    values={[4,10]}
                    value={this.state.volume}
                    onChange={(val ?: number) => this.setVolume(val)}
                />
                
                <Button 
                    onClick={() => this.startStop()}
                    label={this.state.playing ? 'Stop' : 'Play'}
                />

                <FormControl variant="filled" size="small">
                    <InputLabel sx={{
                        color: "ivory",
                        paddingLeft: "2em",
                        paddingRight: "2em",
                        width: "10em",
                        verticalAlign: "middle"
                    }}> {this.state.beat && this.state.beat.getTickLabel()}</InputLabel>
                </FormControl>
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
