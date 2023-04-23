import React from 'react';
import TunerUtils from './TunerUtils';

const VH = 256;
const VW = 1024;
// const SCALE = 4;

class Tuner extends React.Component {
        constructor(props) {
            super(props);

            const dataArray = TunerUtils.createSampleData();
            this.state = {
                isRunning: false,
                sampleRate: 0,
                tickSizeInHz: 1,
                pitch: "-",
                note: "-",
                // dataArray: [],
                markers: []
            };
        }

        start() {
            let audioCtx = this.state.audioCtx;
            let analyser = this.state.analyser;

            if (audioCtx === undefined) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }

            if (analyser === undefined) {
                analyser = audioCtx.createAnalyser();
                analyser.fftSize = 8192;
                analyser.smoothingTimeConstant = 0.9;
            }
            
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            let sampleRate = audioCtx.sampleRate;

            navigator.mediaDevices.getUserMedia({ audio: true, video: false})
            .then((stream) => {
                var source = audioCtx.createMediaStreamSource(stream);
                source.connect(analyser);
            });

            this.setState({
                sampleRate : sampleRate,
                audioCtx: audioCtx,
                analyser: analyser
            })

            setTimeout(() => this.sample(audioCtx, analyser, dataArray), 1000);
        }

        sample(audioCtx, analyser, dataArray) {
            analyser.getByteFrequencyData(dataArray);
            let markers = this.state.markers;
            let maxPoint = TunerUtils.getMaxPoint(audioCtx, analyser, dataArray);
            if (maxPoint !== undefined) {
                markers.push(maxPoint);
                if (markers.length > 10) {
                    markers.shift();
                }
            }

            this.setState({
                note: maxPoint.freq + " hz " + maxPoint.x + " " + audioCtx.sampleRate + " ",
                tickSizeInHz: (audioCtx.sampleRate / 2.0) / analyser.frequencyBinCount,
                dataArray: dataArray,
                markers: markers
            });    
            
            if (this.state.isRunning) {
                setTimeout(() => this.sample(audioCtx, analyser, dataArray), 1000);
            }
        }

        getButtonLabel() {
            return this.state.isRunning ? "Stop" : "Start";
        }

        getNoteName() {
            return this.state.note;
        }

        getEqData() {
            let b = "";


            if (this.state.dataArray !== undefined) {
                const tickSizeInHz = this.state.tickSizeInHz;
                
                b += "M 0,256 "
                for (let x = 0; x < this.state.dataArray.length && x * tickSizeInHz < 1024 ; x += 1) {
                    b +=  " L" + (x * tickSizeInHz) + "," + (256 - this.state.dataArray[x]) + " ";
                }
            }
            return b;
        }

        onClick() {
            if (!this.state.isRunning) {
                this.setState({
                    isRunning: true
                })
                this.start();
            } else {
                this.setState({
                    isRunning: false
                })
            }
        }

        
        render() {
            return (<div className="tuner">
                <svg viewBox={'0 0 '+ VW + ' ' + VH}>
                    <path fill="none" stroke="grey" d={this.getEqData()} />

                    {this.state.markers.map(xy => {
                        return (<circle cx={xy.x * this.state.tickSizeInHz} cy={256 - xy.y} r="3" stroke="grey" strokeWidth="1" fill="grey"/>);
                    })}
                </svg>
                {this.getNoteName()}
                <button onClick={() => this.onClick()}>{this.getButtonLabel()}</button>
                </div>);
        }
}

export default Tuner;
