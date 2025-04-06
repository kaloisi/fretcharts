


async function fetchAudio(audioCtx: AudioContext, name: string, callback: (name: string, buffer: AudioBuffer) => void): Promise<void> {
    let request: XMLHttpRequest = new XMLHttpRequest();
    request.open('GET', process.env.PUBLIC_URL + '/mp3/' + name + '.mp3', true);
    request.responseType = 'arraybuffer';
    
    request.onload = function() {
        try {
            if (request.status === 200) {
                let responseData = request.response;
                console.log(`${name} loaded: `, request);
                if (audioCtx) {
                    audioCtx.decodeAudioData(responseData,
                        (buffer: AudioBuffer) => {
                            console.log(`${name} decoded`, buffer);
                            callback(name, buffer);
                        },
                        (e: DOMException) => {
                            console.log("Error", e);
                        });
                } else {
                    
                }
            } else {
                console.log("Media Load Failed " + this.response.status);
            }
        } catch (e) {
            console.log("Error", e);
        }
    }
    request.send();
}

class AudioRepo {
    files: string[];
    audioBuffers ?: Map<string, AudioBuffer> 
    count : number;

    constructor(files : string[]) {
        
        this.files = files;
        this.count = 0;
    }

    init(audioContext: AudioContext): void {
        if (!this.audioBuffers) {
            this.audioBuffers = new Map();
            for(let i = 0; i < this.files.length; i++) {
                let name = this.files[i];
                const self = this;
                fetchAudio(audioContext, name, (name, buffer) => {
                    console.log("loaded " + name + " " + self.count, buffer)
                    self.setAudioBuffer(name, buffer);
                    self.count += 1;
                    if (self.count === this.files.length) {
                        self.onComplete(audioContext);
                    }
                });
            }
        }
    }

    onComplete(audioCtx: AudioContext): void {
        console.log("Complete", this);
        this.mergeAs(audioCtx, 'drum-set-1-3', ['drum-set-base','drum-set-hi-hat']);
        this.mergeAs(audioCtx, 'drum-set-2-4', ['drum-set-hi-hat', 'drum-set-snare']);
        this.mergeAs(audioCtx, 'drum-set-1-knock', ['drum-set-base','drum-set-hi-hat', 'knock']);

        // rock beat with snoop
        this.mergeAs(audioCtx, 'snoop-drum-1', ['drum-set-1-3', "one"]);
        this.mergeAs(audioCtx, 'snoop-drum-2', ['drum-set-2-4' /*, "two" */]);
        this.mergeAs(audioCtx, 'snoop-drum-3', ['drum-set-1-3' /*, "three" */]);
        this.mergeAs(audioCtx, 'snoop-drum-4', ['drum-set-2-4' /* , "four" */]);
        this.mergeAs(audioCtx, 'snoop-drum-5', ['drum-set-1-3' /*, "five" */]);
        this.mergeAs(audioCtx, 'snoop-drum-6', ['drum-set-2-4' /*, "six" */]);
        this.mergeAs(audioCtx, 'snoop-drum-7', ['drum-set-1-3' /*/, "seven" */]);
        this.mergeAs(audioCtx, 'snoop-drum-8', ['drum-set-2-4' /*, "eight" */]);
    }
    
    setAudioBuffer(name: string, buffer: AudioBuffer): void {
        if(this.audioBuffers) {
            this.audioBuffers.set(name, buffer);
        }
    }

    getAudioBuffer(name: string | undefined): AudioBuffer | undefined {
        if (!name) {
            return undefined;
        }

        let res = this.audioBuffers?.get(name);
        return res;
    }

    mergeAs(audioCtx: AudioContext, newName: string, mixed: string[]): void {
        let dest: AudioBuffer | undefined = undefined;

        for(let i = 0; i < mixed.length; i += 1) {
            const nextName = mixed[i];
            let next = this.audioBuffers?.get(nextName);

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

        if (dest) {
            this.audioBuffers?.set(newName, dest);
        }
    }
}


type SoundMap = {
    BEATS ?: string[],
    WILDCARD ?: string,
    EEE ?: string,
    AND ?: string,
    UH ?: string,
    TRIP ?: string,
    LET? : string
}

export class AudioFiles {
    name: string;
    files: Record<string, string>

    constructor(name: string, fileMap: SoundMap) {
        this.name = name;
        this.files = {};
        if (fileMap.BEATS) {
            for (let i = 0; i < fileMap.BEATS.length; i += 1) {
                this.files[(i + 1).toString()] = fileMap.BEATS[i];
            }
        }

        if (fileMap.AND) this.files['-AND'] = fileMap.AND;
        if (fileMap.EEE) this.files['eee'] = fileMap.EEE;
        if (fileMap.UH) this.files['uh'] = fileMap.UH;
        if (fileMap.TRIP) this.files['trip'] = fileMap.TRIP;
        if (fileMap.LET) this.files['let'] = fileMap.LET;
        if (fileMap.WILDCARD) this.files['*'] = fileMap.WILDCARD;

        console.log(`${name}`, this.files);
    }


    getAudioBuffer(beatName: string | number): AudioBuffer | undefined {
        let beatNameAsString = typeof beatName === "number" ? beatName.toString() : beatName;
        let audioBufferName = this.files[beatNameAsString];
        let audioBuffer: AudioBuffer | undefined = undefined;

        if (audioBufferName) {
            audioBuffer = AUDIO_REPO.getAudioBuffer(audioBufferName);
        }

        if (!audioBuffer) {
            audioBuffer = AUDIO_REPO.getAudioBuffer(this.files['*']);
        }
        return audioBuffer;
    }
}

export const AUDIO_REPO = new AudioRepo([
        'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', /* snoop */
        'eee', 'and', 'uh',
        'trip', 'let',
        'drum-set-hi-hat', 'drum-set-snare', 'drum-set-tom', 'drum-set-cymbal', 'drum-set-base',
        'knock', 'snare'
    ]
);

export const AudioLib = Array.of(
    new AudioFiles("Rock Beats",
        {
            BEATS: ['drum-set-1-3', 'drum-set-2-4', 'drum-set-1-3', 'drum-set-2-4', 'drum-set-1-3', 'drum-set-2-4', 'drum-set-1-3', 'drum-set-2-4'],
            WILDCARD: 'drum-set-hi-hat'
    }),
    new AudioFiles("Rock - knock on one",
        {
            BEATS: ['drum-set-1-knock', 'drum-set-2-4' , 'drum-set-1-3', 'drum-set-2-4' , 'drum-set-1-3', 'drum-set-2-4', 'drum-set-1-3' , 'drum-set-2-4' ],
            WILDCARD: 'drum-set-hi-hat'
    }),
    new AudioFiles(
        "Snoop Beat",
        {
            BEATS: ['snoop-drum-1', 'snoop-drum-2', 'snoop-drum-3', 'snoop-drum-4', 'snoop-drum-5', 'snoop-drum-6', 'snoop-drum-7', 'snoop-drum-8'],
            WILDCARD: 'drum-set-hi-hat'
    }),
    new AudioFiles(
        "Snoop Dogg",
        {
            BEATS: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],
            EEE: 'eee',
            AND: 'and',
            UH: 'uh',
            TRIP: 'trip',
            LET: 'let'
    }),
    new AudioFiles("Snare", { WILDCARD: 'snare'}),
    new AudioFiles("Woodblock", { WILDCARD: 'knock'}),
);
