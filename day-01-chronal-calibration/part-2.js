const data = require("fs")
    .readFileSync("./input.txt")
    .toString()
    .split("\n")
    .map((x) => parseInt(x));

function getFrequencyReachedTwice() {
    const frequencies = new Set();
    let currentFreq = 0;
    const dataLength = data.length;
    
    for (let i = 0; ; i++) {
        if (i >= dataLength) {
            i = 0;
        }

        currentFreq += data[i];

        if (frequencies.has(currentFreq)) {
            return currentFreq;
        } else {
            frequencies.add(currentFreq);
        }
    }
}

getFrequencyReachedTwice();