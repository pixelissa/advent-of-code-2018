//const input = require("fs").readFileSync("./input.txt");

const calibrate = (input) => {
    return input
        .toString()
        .split("\n")
        .map(val => parseInt(val))
        .reduce((a, b) => a + b, 0);
}

//console.log(calibrate(input));

module.exports = calibrate;