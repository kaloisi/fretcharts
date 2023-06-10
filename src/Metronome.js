import React from 'react';
import ChordProgression from './ChordProgression';
import Beat from './models/Beat';


export default class Metronome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bpm: this.props.bpm,
            bpb: this.props.bpb,
            tpb: this.props.tpb,
            volume: this.props.volume,
            playing: false,
            interval: null,
            beat: undefined,
            mediaLoading: false,
            clickFx: undefined,
            audioCtx: undefined,
            audioOut: undefined
        };
    }

    beep() {
        try {
            let audioCtx = this.state.audioCtx;
            let clickFx = this.state.clickFx;
            let mediaLoading = this.state.mediaLoading;

            if (audioCtx === undefined) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }

            if (clickFx) {
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
                source.buffer = clickFx;
                source.connect(audioOut); 
                source.start();
                
                if (this.props.onBeatChange) {
                    this.props.onBeatChange(beat)
                }

                this.setState({
                    beat: beat,
                    audioOut: audioOut
                })
            } else if (!mediaLoading) {
                mediaLoading = true;
                console.log("Loading Audio Files");
                const self = this;
                var request = new XMLHttpRequest();
                request.open('GET', process.env.PUBLIC_URL + '/mp3/knock.mp3', true);
                request.responseType = 'arraybuffer';
                
                // Decode asynchronously
                request.onload = function() {
                    try {
                        if (request.status === 200) {
                            let responseData = request.response;
                            console.log("Media Loaded: ", request);
                            audioCtx.decodeAudioData(responseData,
                                (buffer) => {
                                    console.log("Buffer Loaded", buffer, self);
                                    self.setState({
                                        clickFx: buffer
                                    });
                                },
                                (e) => {
                                    console.log("Error", e);
                                });
                        } else {
                            console.log("Media Load Failed " + this.response.status);
                        }
                    } catch (e) {
                        console.log("Error", e);
                    }
                }
                request.send();
            } else {
                console.log("media loading");
                return;
            }

            this.setState({
                mediaLoading: mediaLoading,
                audioCtx: audioCtx
            });
        } catch(e) {
            console.log("Error", e);
        }
    }

    doneLoading() {
        console.log("Done Loading");
    }

    updateInterval(playing) {
        let handle = this.state.interval;
        if (handle) {
            clearInterval(handle);
            handle = null;
        }

        if (playing) {
            let bpmInMs = (60000 / this.state.bpm / this.state.tpb);
            console.log("Running at " + bpmInMs);
            handle = setInterval(() => this.beep(), bpmInMs);
        }

        return handle;
    }


    startStop() {
        const newVal = ! this.state.playing;
        if (!newVal && this.props.onStop) {
            this.props.onStop();
        }
        const handle = this.updateInterval(newVal);
        this.setState({
            beat: undefined,
            playing: newVal,
            interval: handle
        });
    }

    setBpm(e) {
        const newBpm = e.target.value;
        this.setState({
            bpm: newBpm
        });
        console.log("BPM = " + newBpm);
    }

    setBpb(e) {
        this.setState({
            bpb: e.target.value
        })
    }

    setTpb(e) {
        this.setState({
            tpb: e.target.value
        })
    }

    setVolume(e) {
        this.setState({
            volume: e.target.value
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
        return (
        <div>
            <div className='metronome'>
                <input type='number' min={2} max={4} size={6} maxLength={6} defaultValue={ this.state.tpb } onChange={(e) => this.setTpb(e)}/>
                <div className='label'>Tick per beat</div>

                <input type='number' min={2} max={8} size={6} maxLength={6} defaultValue={ this.state.bpb } onChange={(e) => this.setBpb(e)}/>
                <div className='label'>Beats per bar</div>

                <input type='number' min={1} max={200} size={6} maxLength={6} defaultValue={ this.state.bpm } onChange={(e) => this.setBpm(e)}/>
                <div className='label'>Beats per minute</div>

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
                <div className='label'>Volume</div>


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
