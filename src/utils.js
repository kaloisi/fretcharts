const TONES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const MAJOR_SEMITONS = [0, 2, 4, 5, 7, 9, 11];
const MINOR_SEMITONS = [0, 2, 3, 5, 7, 8, 10];


const buildKey = (name, startingPos, semitones) => {
    const tones = [];
    semitones.forEach(t => {
        tones.push(TONES[(startingPos + t) % TONES.length]);
    });
    return {
        name: name,
        startingSemitone: startingPos,
        semitones: semitones,
        tones: tones
    };
}

const resolveNotesForScale = (guitarState, fret, position) => {
    const notes = new Map();
    const offsets = position.fretOffsets;
    const intervals = position.intervals;

    for(let s = 0 ; s < offsets.length; s = s + 1) {
        const stringOffsets = offsets[s];
        for (let f = 0; f < stringOffsets.length; f = f + 1) {
            const n = guitarState.getNoteAt(s, fret + stringOffsets[f]);
            if (n) {
                notes.set(n, intervals ? intervals[s][f] : "?");
            }
        }
    }
    return notes;
}

// const resolveIntervalLabelForScale = (position, stringNumber, fret) => {
//     const offsets = position.fretOffsets[stringNumber];
//     for(let i = 0; i < offsets.length; i = i + 1) {
//         let p = position.offsets[i];
//         if (p === fret) {
//             return position.intervals[string][p];
//         }
//     }
//     return undefined;
// }

const Utils = {
    TONES: TONES,
    COLORS: {
        red:   {r: 255, g:0,    b:0},
        blue:  {r: 0,   g:0,    b:255},
        green: {r: 0,   g:255,  b:0}
    },
    KEYS: {
        C_MAJOR: buildKey('C-Major', 0, MAJOR_SEMITONS),
        C_MINOR: buildKey('C-Minor', 0, MINOR_SEMITONS),
        
        D_MAJOR: buildKey('D-Major', 2, MAJOR_SEMITONS),
        D_MINOR: buildKey('D-Minor', 2, MINOR_SEMITONS),
        
        E_MAJOR: buildKey('E-Major', 4, MAJOR_SEMITONS),
        E_MINOR: buildKey('E-Minor', 4, MINOR_SEMITONS),

        F_MAJOR: buildKey('F-Major', 5, MAJOR_SEMITONS),
        F_MINOR: buildKey('F-Minor', 5, MINOR_SEMITONS),

        G_MAJOR: buildKey('G-Major', 7, MAJOR_SEMITONS),
        G_MINOR: buildKey('G-Minor', 7, MINOR_SEMITONS),

        A_MAJOR: buildKey('A-Major', 9, MAJOR_SEMITONS),
        A_MINOR: buildKey('A-Minor', 9, MINOR_SEMITONS),

        B_MAJOR: buildKey('B-Major', 11, MAJOR_SEMITONS),
        B_MINOR: buildKey('B-Minor', 11, MINOR_SEMITONS),
    },

    POSITIONS: {
        FIRST: {
            rootStringNumber: 4,
            positionName: "1st",
            name: "1st - Scale",
            fretOffsets: [
                [-3, -2, 0],
                [-3, -2, 0],
                [-3, -1],
                [-3, -1, 0],
                [-3, -1, 0],
                [-3, -2, 0],
            ],
            intervals: [
                ["3", "4" , "5"],
                ["7", "1", "2"],
                ["5", "6"],
                ["2", "3", "4"],
                ["6", "7", "1"],
                ["3", "4", "5"],
            ]
        },
        FIRST_MAJOR_ARPPEGIO: {
            rootStringNumber: 4,
            name: "1st - Major Triad Arpeggio",
            positionName: "1st",
            fretOffsets: [
                [-3, 0],
                [-2],
                [-3],
                [-1],
                [0],
                [-3, 0],
            ],
            intervals: [
                ["3", "5"],
                ["1"],
                ["5"],
                ["3"],
                ["1"],
                ["3", "5"],
            ]
        },
        FIRST_MAJOR_7_ARPPEGIO: {
            rootStringNumber: 4,
            name: "1st - Major 7 Arpeggio",
            positionName: "1st",
            fretOffsets: [
                [-3, 0],
                [-3, -2],
                [-3],
                [-1],
                [-1, 0],
                [-3, 0],
            ],
            intervals: [
                ["3", "5"],
                ["7", "1"],
                ["5"],
                ["3"],
                ["7", "1"],
                ["3", "5"],
            ]
        },
        FIRST_DOM_7_ARPPEGIO: {
            rootStringNumber: 4,
            positionName: "1st",
            name: "1st - Dom 7 Arpeggio",
            fretOffsets: [
                [-3, 0],
                [-2],
                [-3, 0],
                [-1],
                [-2, 0],
                [-3, 0],
            ],
            intervals: [
                ["3", "5"],
                ["1"],
                ["5", "b7"],
                ["3"],
                ["b7", "1"],
                ["3", "5"],
            ]
        },
        FIRST_MINOR_ARPPEGIO: {
            rootStringNumber: 4,
            positionName: "1st",
            name: "1st - Minor Triad Arpeggio",
            fretOffsets: [
                [0],
                [-2, 1],
                [-3],
                [-2],
                [0],
                [0],
            ],
            intervals: [
                ["5"],
                ["1", "b3"],
                ["5"],
                ["b3"],
                ["1"],
                ["5"],
            ]
        },
        FIRST_MINOR_7_ARPPEGIO: {
            rootStringNumber: 4,
            positionName: "1st",
            name: "1st - Minor 7 Arpeggio",
            fretOffsets: [
                [0],
                [-2, 1],
                [-3, 0],
                [-2],
                [-2, 0],
                [0],
            ],
            intervals: [
                ["5"],
                ["1", "b3"],
                ["5", "b7"],
                ["b3"],
                ["b7","1"],
                ["5"],
            ]
        },
        FIRST_MAJOR_PENTA: {
            rootStringNumber: 4,
            positionName: "1st",
            name: "1st - Pentatonic (Major)",
            fretOffsets: [
                [-3,  0],
                [-2,  0],
                [-3, -1],
                [-3, -1],
                [-3,  0],
                [-3,  0],
            ],intervals: [
                ["3", "5"],
                ["1", "2"],
                ["5", "6"],
                ["2", "3"],
                ["6", "1"],
                ["3", "5"],
            ]
        },
        FIRST_MINOR_PENTA: {
            rootStringNumber: 4,
            positionName: "1st",
            name: "1st - Pentatonic (Minor)",
            fretOffsets: [
                [-2,  0],
                [-2,  1],
                [-3,  0],
                [-2,  0],
                [-2,  0],
                [-2,  0],
            ],intervals: [
                ["4",  "5"],
                ["1", "b3"],
                ["5", "b7"],
                ["b3", "4"],
                ["b7", "1"],
                [ "4", "5"],
            ]
        },
        SECOND: {
            rootStringNumber: 4,
            positionName: "2nd",
            name: "2nd - Scale",
            fretOffsets: [
                [0, 2, 4],
                [0, 2, 3],
                [-1, 1 , 2],
                [-1, 0 , 2],
                [-1, 0 , 2],
                [0 , 2],
            ],
            intervals: [
                ["5","6","7"],
                ["2","3","4"],
                ["6","7","1"],
                ["3","4","5"],
                ["7","1","2"],
                ["5","6"],
            ]
        },
        SECOND_MAJOR_TRIAD_ARPEGGIO: {
            default: false,
            rootStringNumber: 4,
            positionName: "2nd",
            name: "2nd - Major Triad Arpeggio",
            fretOffsets: [
                [0],
                [2],
                [2],
                [-1, 2],
                [0],
                [0 ],
            ],
            intervals: [
                ["5"],
                ["3"],
                ["1"],
                ["3","5"],
                ["1"],
                ["5"],
            ]
        },
        SECOND_MAJOR_7_ARPEGGIO: {
            default: true,
            rootStringNumber: 4,
            positionName: "2nd",
            name: "2nd - Major 7 Arpeggio",
            fretOffsets: [
                [0 , 4],
                [2],
                [1 , 2],
                [-1, 2],
                [-1, 0],
                [0 ],
            ],
            intervals: [
                ["5","7"],
                ["3"],
                ["7","1"],
                ["3","5"],
                ["7","1"],
                ["5"],
            ]
        },
        SECOND_DOM_7_ARPEGGIO: {
            rootStringNumber: 4,
            positionName: "2nd",
            name: "2nd - Dom 7 Arpeggio",
            fretOffsets: [
                [0 , 3],
                [2],
                [0 , 2],
                [-1, 2],
                [0],
                [0, 3 ],
            ],intervals: [
                ["5","b7"],
                ["3"],
                ["b7","1"],
                ["3","5"],
                ["1"],
                ["5","b7"],
            ]
        },
        SECOND_MINOR_TRIAD_ARPEGGIO: {
            rootStringNumber: 4,
            positionName: "2nd",
            name: "2nd - Minor Triad Arpeggio",
            fretOffsets: [
                [0],
                [1],
                [2],
                [2],
                [0, 3],
                [0],
            ],intervals: [
                ["5"],
                ["b3"],
                ["1"],
                ["5"],
                ["1", "b3"],
                ["5"],
            ]
        },
        SECOND_MINOR_7_ARPEGGIO: {
            rootStringNumber: 4,
            positionName: "2nd",
            name: "2nd - Minor 7 Arpeggio",
            fretOffsets: [
                [0 , 3],
                [1],
                [0 , 2],
                [2],
                [0, 3],
                [0, 3],
            ],intervals: [
                ["5","b7"],
                ["b3"],
                ["b7","1"],
                ["5"],
                ["1", "b3"],
                ["5","b7"],
            ]
        },
        SECOND_MINOR_7_B5_ARPEGGIO: {
            rootStringNumber: 4,
            positionName: "2nd",
            name: "2nd - Minor 7 b5 Arpeggio",
            fretOffsets: [
                [-1 , 3],
                [1],
                [0 , 2],
                [1],
                [0, 3],
                [-1, 3],
            ],intervals: [
                ["b5","b7"],
                ["b3"],
                ["b7","1"],
                ["b5"],
                ["1", "b3"],
                ["b5","b7"],
            ]
        },
        SECOND_MAJOR_PENTA: {
            rootStringNumber: 4,
            positionName: "2nd",
            name: "2nd - Pentatonic (Major)",
            fretOffsets: [
                [ 0, 2],
                [ 0, 2],
                [-1, 2],
                [-1, 2],
                [ 0, 2],
                [ 0, 2],
            ],intervals: [
                ["2", "6"],
                ["3", "3"],
                ["6", "1"],
                ["3", "5"],
                ["1", "2"],
                ["5", "6"],
            ]
        },
        SECOND_MINOR_PENTA: {
            rootStringNumber: 4,
            positionName: "2nd",
            name: "2nd - Pentatonic (Minor)",
            fretOffsets: [
                [0, 3],
                [1, 3],
                [0, 2],
                [0, 2],
                [0, 3],
                [0, 3],
            ],intervals: [
                ["5", "b7"],
                ["b3", "4"],
                ["b7", "1"],
                ["4",  "5"],
                ["1", "b3"],
                ["5", "b7"],
            ]
        },
        THIRD: {
            rootStringNumber: 5,
            positionName: "3rd",
            name: "3rd - Scale",
            fretOffsets: [
                [-3, -1, 0],
                [-3, -2, 0],
                [-4, -3, -1],
                [-3, -1],
                [-3, -1, 0],
                [-3, -1, 0],
            ],
            intervals: [
                ["6", "7", "1"],
                ["3", "4", "5"],
                ["7", "1", "2"],
                ["5", "6"],
                ["2", "3", "4"],
                ["6", "7", "1"],
            ]
        },
        THIRD_MAJOR_7_ARPEGGIO: {
            rootStringNumber: 5,
            positionName: "3rd",
            name: "3rd - Major 7 Arpeggio",
            fretOffsets: [
                [-1, 0],
                [-3, 0],
                [-4, -3],
                [-3],
                [-1],
                [-1, 0],
            ],
            intervals: [
                ["7", "1"],
                ["3", "5"],
                ["7", "1"],
                ["5"],
                ["3"],
                ["7", "1"],
            ]
        },
        THIRD_DOM_7_ARPEGGIO: {
            rootStringNumber: 5,
            positionName: "3rd",
            name: "3rd - Dom 7 Arpeggio",
            fretOffsets: [
                [-2, 0],
                [-3, 0],
                [-3],
                [-3, 0],
                [-1],
                [-2, 0],
            ],
            intervals: [
                ["b7", "1"],
                ["3", "5"],
                ["1"],
                ["5", "b7"],
                ["3"],
                ["b7", "1"],
            ]
        }, 
        THIRD_MINOR_7_ARPEGGIO: {
            rootStringNumber: 5,
            positionName: "3rd",
            name: "3rd - Minor 7 Arpeggio",
            fretOffsets: [
                [-2, 0],
                [0],
                [-3, 0],
                [-3, 0],
                [-2],
                [-2, 0],
            ],
            intervals: [
                ["b7", "1"],
                ["5"],
                ["1", "b3"],
                ["5", "b7"],
                ["b3"],
                ["b7", "1"],
            ]
        },
        THRID_MAJOR_PENTA: {
            rootStringNumber: 5,
            positionName: "3rd",
            name: "3rd - Pentatonic (Major)",
            fretOffsets: [
                [-3, 0],
                [-3, 0],
                [-3, -1],
                [-3, -1],
                [-3, -1],
                [-3, 0],
            ],intervals: [
                ["6", "1"],
                ["3", "5"],
                ["1", "2"],
                ["5", "6"],
                ["2", "3"],
                ["4", "1"],
            ]
        },
        THIRD_MINOR_PENTA: {
            rootStringNumber: 5,
            positionName: "3rd",
            name: "3rd - Pentatonic (Minor)",
            fretOffsets: [
                [-2, 0],
                [-2, 0],
                [-3, 0],
                [-3, 0],
                [-2, 0],
                [-2, 0],
            ],intervals: [
                ["b7", "1"],
                [ "4", "5"],
                ["1",  "3"],
                ["5",  "b7"],
                ["b3", "4"],
                ["b7", "1"],
            ]
        },
        FORTH: {
            rootStringNumber: 5,
            positionName: "4th",
            name: "4th - Scale",
            fretOffsets: [
                [-1, 0 , 2],
                [0 , 2],
                [-1, 1 , 2],
                [-1, 1 , 2],
                [-1, 0 , 2],
                [-1, 0 , 2],
            ],
            intervals: [
                ["7", "1" , "2"],
                ["5" , "6"],
                ["2", "3" , "4"],
                ["6", "7" , "1"],
                ["3", "4", "5"],
                ["7", "1", "2"],
            ]
        },
        FORTH_MAJOR_7_ARPEGGIO: {
            default: true,
            rootStringNumber: 5,
            positionName: "4th",
            name: "4th - Major 7 Arpeggio",
            fretOffsets: [
                [-1, 0],
                [0],
                [1],
                [1 , 2],
                [-1, 2],
                [-1, 0],
            ],intervals: [
                ["7", "1"],
                ["5"],
                ["3"],
                ["7" , "1"],
                ["3", "5"],
                ["7", "1"],
            ]
        },
        FORTH_DOM_7_ARPEGGIO: {
            rootStringNumber: 5,
            positionName: "4th",
            name: "4th - Dom 7 Arpeggio",
            fretOffsets: [
                [0],
                [0, 2],
                [1],
                [0 , 2],
                [-1, 2],
                [0],
            ],intervals: [
                ["1"],
                ["5", "b7"],
                ["3"],
                ["b7" , "1"],
                ["3", "5"],
                ["1"],
            ]
        },
        FORTH_MINOR_7_ARPEGGIO: {
            rootStringNumber: 5,
            positionName: "4th",
            name: "4th - Minor 7 Arpeggio",
            fretOffsets: [
                [0, 3],
                [0, 2],
                [0],
                [0 , 2],
                [2],
                [0, 3],
            ],intervals: [
                ["1", "b3"],
                ["5", "b7"],
                ["b3"],
                ["b7" , "1"],
                ["5"],
                ["1", "b3"],
            ]
        },
        FORTH_MINOR_PENTA: {
            rootStringNumber: 5,
            positionName: "4th",
            name: "4th - Pentatonic (Minor)",
            fretOffsets: [
                [ 0,  3],
                [ 0,  3],
                [ 0,  2],
                [ 0,  2],
                [ 0,  2],
                [ 0,  3],
            ],intervals: [
                ["1", "b3"],
                ["5", "b7"],
                ["b3", "4"],
                ["b7", "1"],
                ["4", "5"],
                ["1", "b3"],
            ]
        },
        FIFTH_MAJOR_7_SCALE: {
            rootStringNumber: 3,
            positionName: "5th",
            name: "5th - Major 7 Scale",
            fretOffsets: [
                [0, 2, 3],
                [0, 2, 3],
                [-1, 0, 2],
                [-1, 0, 2],
                [0, 2],
                [0, 2, 3],
            ],intervals: [
                ["2", "3", "4"],
                ["6", "7", "1"],
                ["3", "4", "5"],
                ["7", "1", "2"],
                ["5", "6"],
                ["2", "3", "4"],
            ]
        },
        FIFTH_MAJOR_7_ARPEGGIO: {
            default: true,
            rootStringNumber: 3,
            positionName: "5th",
            name: "5th - Major 7 Arpeggio",
            fretOffsets: [
                [2],
                [2, 3],
                [-1, 2],
                [-1, 0],
                [0],
                [2],
            ],intervals: [
                ["3"],
                ["7", "1"],
                ["3", "5"],
                ["7", "1"],
                ["5"],
                ["3"],
            ]
        },
        FIFTH_DOM_7_ARPEGGIO: {
            rootStringNumber: 3,
            positionName: "5th",
            name: "5th - Dom 7 Arpeggio",
            fretOffsets: [
                [2],
                [1, 3],
                [-1, 2],
                [0],
                [0, 3],
                [2],
            ],intervals: [
                ["3"],
                ["b7", "1"],
                ["3", "5"],
                ["1"],
                ["5", "b7"],
                ["3"],
            ]
        },
        FIFTH_MINOR_7_ARPEGGIO: {
            rootStringNumber: 3,
            positionName: "5th",
            name: "5th - Minor 7 Arpeggio",
            fretOffsets: [
                [1],
                [1, 3],
                [2],
                [0, 3],
                [0, 3],
                [2],
            ],intervals: [
                ["b3"],
                ["b7", "1"],
                ["5"],
                ["1","b3"],
                ["5", "b7"],
                ["b3"],
            ]
        },
        FIFTH_MAJOR_PENTA: {
            rootStringNumber: 3,
            positionName: "5th",
            name: "5th - Pentatonic (Major)",
            fretOffsets: [
                [ 0,  2],
                [ 0,  3],
                [-1,  2],
                [ 0,  2],
                [ 0,  2],
                [ 0,  2],
            ],intervals: [
                ["2", "3"],
                ["6", "1"],
                ["3", "5"],
                ["1", "2"],
                ["5", "6"],
                ["2", "3"],
            ]
        },
        FIFTH_MINOR_PENTA: {
            rootStringNumber: 3,
            positionName: "5th",
            name: "5th - Pentatonic (Minor)",
            fretOffsets: [
                [ 1,  3],
                [ 1,  3],
                [ 0,  2],
                [ 0,  3],
                [ 0,  3],
                [ 1,  3],
            ],intervals: [
                ["b3", "4"],
                ["b7", "1"],
                [ "4", "5"],
                [ "1", "b3"],
                [ "5", "b7"],
                ["b3", "4"],
            ]
        },
    },

    resolveNotesForScale: resolveNotesForScale,
    //resolveIntervalLabelForScale: resolveIntervalLabelForScale,
    getPositionsForString(string) {
        return Object.values(this.POSITIONS).filter(n => n.rootStringNumber === string);        
    }
};

export default Utils;