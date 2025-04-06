import { Utils, KEYS , TONES } from "../utils";

const MAX_FRET_COUNT = 17;
const SCALE_COLORS = ["#4E79A5", "#F18F3B", "#E0585B", "#77B7B2", "#5AA155", "#EDC958", "#AF7AA0", "#FE9EA8", "#9C7561", "#BAB0AC"];

export class ToneState {
    uid: string;
    name: string;
    stringNumber: number;
    fret: number;
    position: string;
    usedIn: Map<string, string>;

    constructor(uid: string, toneName: string, stringNumber: number, fret: number) {
        this.uid = uid;
        this.name = toneName;
        this.stringNumber = stringNumber;
        this.fret = fret;
        this.usedIn = new Map<string, string>();

        if (fret === 0) {
            this.position = "Open " + toneName;
        } else {
            this.position = toneName + " " + (stringNumber + 1) + " @ " + fret;
        }
    }

    add(scale: ScalePattern, intervalLabel: string): void {
        this.usedIn.set(scale.uid, intervalLabel);
    }

    remove(scale: ScalePattern): void {
        this.usedIn.delete(scale.uid);
    }

    isUsedInScale(scale: ScalePattern): boolean {
        return this.usedIn.has(scale.uid);
    }

    getIntervalLabel(scale: ScalePattern): string | undefined {
        return this.usedIn.get(scale.uid);
    }
}

export class StringState {
    name: string;
    uid: string;
    intervalOffset: number;
    tones: ToneState[];

    constructor(intervalOffset: number, stringNumber: number) {
        this.name = TONES[intervalOffset];
        this.uid = "string-" + this.name + "-" + stringNumber;
        this.intervalOffset = intervalOffset;
        this.tones = [];

        for (let i = 0; i < MAX_FRET_COUNT; i++) {
            const pos = intervalOffset + i;
            const toneName = TONES[pos % TONES.length];
            this.tones.push(
                new ToneState(this.uid + "." + i, toneName, stringNumber, i)
            );
        }
    }

    getNoteAt(fretNumber: number): ToneState | undefined {
        if (fretNumber >= 0 && fretNumber < this.tones.length) {
            return this.tones[fretNumber];
        } else {
            return undefined;
        }
    }
}

export class ScalePattern {
    guitarState: GuitarState;
    uid: string;
    name: string;
    fret: number;
    fretNum: number;
    toneState: ToneState;
    scale: any;
    color: string;
    enabled: boolean;
    position?: any;
    toneStates?: ToneState[];

    constructor(
        guitarState: GuitarState,
        toneState: ToneState,
        stringNumber: number,
        fretNum: number,
        scaleNumber: number,
        color: string
    ) {
        this.guitarState = guitarState;
        this.uid = "scale." + stringNumber + "." + fretNum + "." + scaleNumber;
        this.name = toneState.name;
        this.fret = toneState.fret;
        this.fretNum = fretNum;
        this.toneState = toneState;
        this.scale = KEYS.C_MAJOR;
        this.color = color;
        this.enabled = true;
        this.setPosition(Utils.getDefaultPositionForString(stringNumber));
    }

    setPosition(position: any): void {
        if (this.toneStates && this.toneStates.length > 0) {
            for (let t = 0; t < this.toneStates.length; t += 1) {
                const tone = this.toneStates[t];
                tone.remove(this);
            }
        }

        this.position = position;
        if (position) {
            const notes = Utils.resolveNotesForScale(this.guitarState, this.fretNum, this.position);
            this.toneStates = [];
            notes.forEach((intervalLabel: string, toneState: ToneState) => {
                toneState.add(this, intervalLabel);
                this.toneStates!.push(toneState);
            });
        }
    }
}

class GuitarState {
    strings: StringState[];
    scalePatterns: ScalePattern[];

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

    setActiveScale(scale?: ScalePattern): void {
        for (let i = 0; i < this.scalePatterns.length; i += 1) {
            const next = this.scalePatterns[i];
            next.enabled = !scale || next === scale;
        }
    }

    deleteScalePattern(scalePattern: ScalePattern): void {
        scalePattern.setPosition(undefined);
        this.scalePatterns = this.scalePatterns.filter(e => e !== scalePattern);
    }

    createScalePatternAt(stringNum: number, fretNum: number): ScalePattern | undefined {
        const note = this.getNoteAt(stringNum, fretNum);
        if (note) {
            const scaleNumber = this.scalePatterns.length;
            const color = SCALE_COLORS[scaleNumber % SCALE_COLORS.length];

            const scalePattern = new ScalePattern(
                this,
                note,
                stringNum,
                fretNum,
                scaleNumber,
                color
            );

            this.scalePatterns.push(scalePattern);
            return scalePattern;
        }
        return undefined;
    }

    getNoteAt(stringNumber: number, fretNumber: number): ToneState | undefined {
        const s = this.strings[stringNumber];
        return s ? s.getNoteAt(fretNumber) : undefined;
    }

    getRowNumberForScale(scale: ScalePattern): number {
        return this.scalePatterns.indexOf(scale);
    }
}

export default GuitarState;