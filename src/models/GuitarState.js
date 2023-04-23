import Utils from "../utils.js";

const MAX_FRET_COUNT = 17;

class ToneState {
    constructor(uid, toneName, stringNumber, fret) {
        this.uid = uid;
        this.name = toneName;
        this.stringNumber = stringNumber;
        this.fret = fret;
        this.usedIn = new Map();

        if (fret === 0) {
            this.position = "Open " + toneName;
        } else {
            this.position = toneName + " " + (stringNumber + 1)+ " @ " + fret;
        }
    }

    select(scale, interval) {
        this.usedIn.set(scale.uid, interval);
    }

    deselect(scale) {
        this.usedIn.delete(scale.uid);
    }

    isUsedInScale(scale) {
        return this.usedIn.has(scale.uid)
    }

    getIntervalLabel(scale) {
        return this.usedIn.get(scale.uid);
    }

}

class StringState {
    constructor(intervalOffset, stringNumber) {
        this.name = Utils.TONES[intervalOffset];
        this.uid = "string-" + this.name + "-" + stringNumber;
        this.intervalOffset = intervalOffset;
        this.tones = [];

        for (let i = 0; i < MAX_FRET_COUNT; i++) {
            const pos = intervalOffset + i;
            const toneName = Utils.TONES[pos % Utils.TONES.length]
            this.tones.push(
                new ToneState(this.uid + "." + i, toneName, stringNumber, i)
            );
        }
    }

    getNoteAt(fretNumber) {
        if (fretNumber >= 0 && fretNumber < this.tones.length) {
            return this.tones[fretNumber];
        } else {
            return undefined;
        }
    }
}

class GuitarState {
    constructor() {
        this.strings = [];
        this.strings.push(new StringState(4, 0));
        this.strings.push(new StringState(11, 1));
        this.strings.push(new StringState(7, 2));
        this.strings.push(new StringState(2, 3));
        this.strings.push(new StringState(9, 4));
        this.strings.push(new StringState(4, 5));
    }

    getNoteAt(stringNumber, fretNumber) {
        const s = this.strings[stringNumber];
        return s.getNoteAt(fretNumber);
    }
}

export default GuitarState;