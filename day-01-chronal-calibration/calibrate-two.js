//const input = require("fs").readFileSync("./input.txt");

const calibrateDuplicates = (input) => {
    input = input
        .toString()
        .split("\n")
        .map(x => parseInt(x));

    const frequencies = new Set();
    let currentFreq = 0;
    const inputLength = input.length;

    for (let i = 0; ; i++) {
        if (i >= inputLength) {
            i = 0;
        }

        if (frequencies.has(currentFreq)) {
            return currentFreq;
        } else {
            frequencies.add(currentFreq);
        }

        currentFreq += input[i];
    }   
}

//console.log(calibrateDuplicates(input));

module.exports = calibrateDuplicates;
