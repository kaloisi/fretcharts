
const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const LOG_2 = Math.log(2);



const MIN_FREQ = 77.78; // Eb below low E string
const MAX_FREQ = 77.78 * 8; 

function onTheSameSideOfZero(y1, y2) {
    return (y1 > 0 && y2 > 0) 
        || (y1 < 0 && y2 < 0);
}

function noteFromPitch( frequency ) {
    var noteNum = 12 * (Math.log( frequency / 440 ) / LOG_2 );
    return Math.round( noteNum ) + 69;
}


function createXyGroups(dataArray) {
    let xyGroups = [];
    let group = []
    xyGroups.push(group);

    let lastY = 0;

    // split the series into groups based upon when the curve jumps of zero
    for (let i = 1; i < dataArray.length; i += 1) {
        const oy = dataArray[i];
        const y = oy - 128;

        // skip any points near Y = 0
        if (y >= -3 && y <= 3) {
            continue;
        }

        if (!onTheSameSideOfZero(y, lastY) && group.length > 0) {
            console.log("Group Created", group);
            // start a new group
            group = [];
            xyGroups.push(group);
        }
        group.push({
            x: i, y: y, oy, oy
        })  
        lastY = y;
    }

    if (xyGroups.length <= 1) {
        return [];
    }

    // return the max value per group
    let result = xyGroups.map((group) => {
        let peak = undefined;

        for (let i = 0; i < group.length; i += 1) {
            const next = group[i];
            if (peak === undefined || Math.abs(next.y) > Math.abs(peak.y)) {
                peak = next;
            }
        }
        return peak;
    });
    return result;
}


const TunerUtils = {
    MIN_FREQ: MIN_FREQ, MAX_FREQ: MAX_FREQ,

    createSampleData: () => {
        const dataArray = new Uint8Array(1024);
        for (let i = 0; i < dataArray.length; i += 1) {
            dataArray[i] = 128 + 90 * Math.sin(i / 20); 
        }
        return dataArray;    
    },

    createXyGroups: createXyGroups,

    getMaxPoint: (audioCtx, analyser, dataArray) => {
        const SCALE = (audioCtx.sampleRate/2.0) / analyser.frequencyBinCount;

        let maxPoint = {x: 0, y:dataArray[0]};
        for (let i = 1; i < dataArray.length && i * SCALE < MAX_FREQ; i++) {
            if (maxPoint.y < dataArray[i]) {
                maxPoint.x = i;
                maxPoint.y = dataArray[i];
                maxPoint.freq = Math.round(maxPoint.x * SCALE);
            }
        }
        return maxPoint;
    }
}


export default TunerUtils;