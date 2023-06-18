

function fetchAudio(name, callback) {
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let request = new XMLHttpRequest();
    request.open('GET', process.env.PUBLIC_URL + '/mp3/' + name + '.mp3', true);
    request.responseType = 'arraybuffer';
    
    // Decode asynchronously
    request.onload = function() {
        try {
            if (request.status === 200) {
                let responseData = request.response;
                //console.log("Media Loaded: ", request);
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
}



class AudioFiles {

    constructor(name, fileMap) {
        this.name = name;
        this.files = {};

        let keys = Object.keys(fileMap);
        keys.forEach(k => {
            this.addFile(k, fileMap[k]);
        });
    }

    addFile(name, path) {
        this.files[name] = undefined;
        fetchAudio(path, (path, buffer) => {
            this.files[name] = buffer;

            let keys = Object.keys(this.files);
            for (let i = 0; i < keys.length; i++) {
                if (!keys[i]) {
                    return;
                }
            }
        });
    }


    getAudioFile(name) {
        let snd = this.files[name];
        return snd ? snd : this.files['*'];
    }
}


const AudioLib = Array.of(
    new AudioFiles(
        "Snoop Doggai",
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
    new AudioFiles("Woodblock", { '*': 'snare'}),
);

export default AudioLib;