const data = require("fs")
    .readFileSync("./input.txt")
    .toString()
    .split("\n");

function getFrequency() {
    return data
        .map((value) => parseInt(value))
        .reduce((a, b) => a + b, 0);
}

getFrequency();