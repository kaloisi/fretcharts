


async function fetchAudio(name, callback) {
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let request = new XMLHttpRequest();
    request.open('GET', process.env.PUBLIC_URL + '/mp3/' + name + '.mp3', true);
    request.responseType = 'arraybuffer';
    
    request.onload = function() {
        try {
            if (request.status === 200) {
                let responseData = request.response;
                console.log("Media Loaded: ", request);
                audioCtx.decodeAudioData(responseData,
                    (buffer) => {
                        //console.log("Buffer Loaded", buffer);
                        callback(name, buffer);
                    },
                    (e) => {
                        console.log("Error", e);
                    });
            } else {
                //console.log("Media Load Failed " + this.response.status);
            }
        } catch (e) {
            console.log("Error", e);
        }
    }
    request.send();
    return request.responseData;
}

class AudioRepo {
    constructor(files, onComplete) {
        this.files = {};
        this.count = 0;
        
        for(let i = 0; i < files.length; i++) {
            let name = files[i];
            const self = this;
            fetchAudio(name, (name, buffer) => {
                console.log("loaded " + name + " " + self.count, buffer)
                self.setAudioBuffer(name, buffer);
                self.count += 1;
                if (self.count === files.length) {
                    onComplete(self);
                }
            });
        }
    }

    setAudioBuffer(name, buffer) {
        this.files[name] = buffer;
    }

    getAudioBuffer(name) {
        let res = this.files[name];
        //console.log(name + " = " + res);
        return res;
    }

    mergeAs(newName, mixed) {
        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let dest = undefined;

        for(let i = 0; i < mixed.length; i += 1) {
            let next = this.files[mixed[i]];
            if (next !== undefined) {
                if (dest === undefined) {
                    dest = audioCtx.createBuffer(
                        next.numberOfChannels,
                        next.length,
                        next.sampleRate);
                }

                
                for (let channel = 0; channel < next.numberOfChannels; channel += 1) {
                    const toBuff = dest.getChannelData(channel);
                    const fromBuff = next.getChannelData(channel);

                    for (let i = 0; i < toBuff.length && i < fromBuff.length; i += 1) {
                      toBuff[i] += fromBuff[i];
                    }
                  }
            }
        }

        this.files[newName] = dest;
    }
}

class AudioFiles {
    constructor(name, fileMap) {
        this.name = name;
        this.files = fileMap;
    }

    getAudioFile(beatName) {
        let audioFile = this.files[beatName];
        if (audioFile === undefined) {
            audioFile = this.files['*'];
        }

        return FILES.getAudioBuffer(audioFile);
    }
}

const FILES = new AudioRepo([
        'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
        'eee', 'and', 'uh',
        'trip', 'let',
        'drum-set-hi-hat', 'drum-set-snare', 'drum-set-tom', 'drum-set-cymbal', 'drum-set-base',
        'knock', 'snare'
    ], 
    (self) => {
        console.log("Complete", self);
        self.mergeAs('drum-set-1-3', ['drum-set-base','drum-set-hi-hat']);
        self.mergeAs('drum-set-2-4', ['drum-set-hi-hat', 'drum-set-snare']);
        self.mergeAs('drum-set-1-knock', ['drum-set-base','drum-set-hi-hat', 'knock']);

        // rock beat with snoop
        self.mergeAs('snoop-drum-1', ['drum-set-1-3', "one"]);
        self.mergeAs('snoop-drum-2', ['drum-set-2-4' /*, "two" */]);
        self.mergeAs('snoop-drum-3', ['drum-set-1-3' /*, "three" */]);
        self.mergeAs('snoop-drum-4', ['drum-set-2-4' /* , "four" */]);
        self.mergeAs('snoop-drum-5', ['drum-set-1-3' /*, "five" */]);
        self.mergeAs('snoop-drum-6', ['drum-set-2-4' /*, "six" */]);
        self.mergeAs('snoop-drum-7', ['drum-set-1-3' /*/, "seven" */]);
        self.mergeAs('snoop-drum-8', ['drum-set-2-4' /*, "eight" */]);
    }
);

const AudioLib = Array.of(
    new AudioFiles("Rock Beats",
        {
            '1': 'drum-set-1-3',
            '3': 'drum-set-1-3',
            '5': 'drum-set-1-3',
            '7': 'drum-set-1-3',

            '2': 'drum-set-2-4',
            '4': 'drum-set-2-4',
            '6': 'drum-set-2-4',
            '8': 'drum-set-2-4',

            '*': 'drum-set-hi-hat'
            // '-E': 'knock',
            // '-AND': 'knock',
            // '-UH': 'knock',
            // '-TRIP': 'knock',
            // '-LET': 'knock'
    }),
    new AudioFiles("Rock - knock on one",
        {
            '1': 'drum-set-1-knock',
            '3': 'drum-set-1-3',
            '5': 'drum-set-1-3',
            '7': 'drum-set-1-3',

            '2': 'drum-set-2-4',
            '4': 'drum-set-2-4',
            '6': 'drum-set-2-4',
            '8': 'drum-set-2-4',

            '*': 'drum-set-hi-hat'
            // '-E': 'knock',
            // '-AND': 'knock',
            // '-UH': 'knock',
            // '-TRIP': 'knock',
            // '-LET': 'knock'
    }),
    new AudioFiles(
        "Snoop Beat",
        {
            '1': 'snoop-drum-1',
            '2': 'snoop-drum-2',
            '3': 'snoop-drum-3',
            '4': 'snoop-drum-4',
            '5': 'snoop-drum-5',
            '6': 'snoop-drum-6',
            '7': 'snoop-drum-7',
            '8': 'snoop-drum-8',

            '*': 'drum-set-hi-hat'
            // '-E': 'knock',
            // '-AND': 'knock',
            // '-UH': 'knock',
            // '-TRIP': 'knock',
            // '-LET': 'knock'
    }),
    new AudioFiles(
        "Snoop Dogg",
        {
            '1': 'one',
            '2': 'two',
            '3': 'three',
            '4': 'four',
            '5': 'five',
            '6': 'six',
            '7': 'seven',
            '8': 'eight',
            '-E': 'eee',
            '-AND': 'and',
            '-UH': 'uh',
            '-TRIP': 'trip',
            '-LET': 'let'
    }),
    new AudioFiles("Snare", { '*': 'snare'}),
    new AudioFiles("Woodblock", { '*': 'knock'}),
);

export default AudioLib;