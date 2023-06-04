import Utils from "../utils.js";

const MAX_FRET_COUNT = 17;
const SCALE_COLORS = ["#4E79A5", "#F18F3B", "#E0585B", "#77B7B2", "#5AA155", "#EDC958", "#AF7AA0", "#FE9EA8", "#9C7561", "#BAB0AC"];


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

    add(scale, intervalLabel) {
        this.usedIn.set(scale.uid, intervalLabel);
    }

    remove(scale) {
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

class ScalePattern {

    constructor(guitarState, toneState, stringNumber, fretNum, scaleNumber, color) {
        this.guitarState = guitarState;
        this.uid = "scale." + stringNumber + "." + fretNum + "." + scaleNumber;
        this.name = toneState.name;
        this.fret = toneState.fret;
        this.fretNum = fretNum;
        this.toneState = toneState;
        this.scale = Utils.KEYS.C_MAJOR;
        this.color = color;
        this.enabled = true;
        this.setPosition(Utils.getDefaultPositionForString(stringNumber));
    }

    setPosition(position) {
        // remove references if already set
        if (this.toneStates && this.toneStates.length > 0) {
            for (let t = 0; t < this.toneStates.length; t += 1) {
                let tone = this.toneStates[t];
                tone.remove(this);
            }
        }
        
        // update references 
        this.position = position;
        let notes = Utils.resolveNotesForScale(this.guitarState, this.fretNum, this.position);
        this.toneStates = [];
        notes.forEach((intervalLabel, toneState) => {
            //console.log("Adding scale to tone:", toneState, intervalLabel);
            toneState.add(this, intervalLabel);
            this.toneStates.push(toneState);
        });
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

        this.scalePatterns = [];
    }



    createScalePatternAt(stringNum, fretNum) {
        let note = this.getNoteAt(stringNum, fretNum);
        if (note) {
            let scaleNumber = this.scalePatterns.length;
            const color = SCALE_COLORS[scaleNumber % SCALE_COLORS.length];

            let scalePattern = new ScalePattern(
                this,
                note,
                stringNum,
                fretNum,
                scaleNumber,
                color);
                
            this.scalePatterns.push(scalePattern);
            return scalePattern;
        }
        return undefined;
    }

    getNoteAt(stringNumber, fretNumber) {
        const s = this.strings[stringNumber];
        return s ? s.getNoteAt(fretNumber) : undefined;
    }
}

export default GuitarState;