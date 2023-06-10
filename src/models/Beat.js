
const tickLabels = [
    [], [],
    ["", "-AND"],
    ["", "-TRIP", "-LET"],
    ["", "-E", "-AND", "-UH"]
];



class Beat {

    constructor(beatPerMinute, beatsPerBar, ticksPerBeat) {
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
            return this.getTickLabels(tickNum);
        }
    }

    getTick() {
        return this.tickCount % this.ticksPerBeat;
    }

    getTickLabel(i) {
        return i === 0 ? (this.getBeat() + 1) : tickLabels[this.ticksPerBeat][i];
    }

    getBeat() {
        return Math.floor(this.tickCount / this.ticksPerBeat) % this.beatsPerBar;
    }

    getBar() {
        return Math.floor((this.tickCount/ this.ticksPerBeat) / this.beatsPerBar);
    }
}


export default Beat;