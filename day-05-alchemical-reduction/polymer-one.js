const input = require("fs").readFileSync("./input.txt");

const polymerOne = (input) => {
    let polymer = input.toString().split("");
    let scanning = true;
    let firstUnitPosition = 0;

    while (scanning) {

        let reacted = checkIfReacted(polymer[firstUnitPosition], polymer[firstUnitPosition + 1]);

        if (reacted) {
            polymer.splice(firstUnitPosition, 2);
            //start again
            firstUnitPosition = 0;
        } else {
            firstUnitPosition++;
        }

        if (!polymer[firstUnitPosition + 1]) {
            scanning = false;
        }

        if (firstUnitPosition >= polymer.length) {
            scanning = false;
        }
    }

    return polymer.length;
 
};

const checkIfReacted = (unit1, unit2) => {
    if (unit1.toLowerCase() === unit2.toLowerCase()) {
        if (unit1 !== unit2) {
            return true;
        }
    }
    return false;
};

console.log(polymerOne(input));

//module.exports = polymerOne;