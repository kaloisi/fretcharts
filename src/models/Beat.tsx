
const tickLabels = [
    [], [],
    ["", "and"],
    ["", "trip", "let"],
    ["", "eee", "and", "uh"]
];



class Beat {
    tickCount : number;
    beatPerMinute : number;
    beatsPerBar : number;
    ticksPerBeat : number;


    constructor(beatPerMinute : number, beatsPerBar : number, ticksPerBeat : number) {
        this.tickCount = 0;
        this.beatPerMinute = beatPerMinute;
        this.beatsPerBar = beatsPerBar;
        this.ticksPerBeat = ticksPerBeat;
    }

    getTicksPerBeat() {
        return this.ticksPerBeat;
    }

    tick() {
        this.tickCount += 1;
    }

    toString() {
        let beatNum = this.getBeat();
        let tickNum = this.getTick();

        if (tickNum === 0) {
            return (beatNum);
        } else {
            return ('' + this.getTickLabel());
        }
    }

    getTick() : number {
        return this.tickCount % this.ticksPerBeat;
    }

    getTickLabel() : string | number {
        let tick = this.getTick();
        return tick === 0 ? (this.getBeat() + 1) : tickLabels[this.ticksPerBeat][tick];
    }

    getBeat() {
        return Math.floor(this.tickCount / this.ticksPerBeat) % this.beatsPerBar;
    }

    getBar() {
        return Math.floor((this.tickCount/ this.ticksPerBeat) / this.beatsPerBar);
    }
}


export default Beat;