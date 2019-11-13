//const input = require("fs").readFileSync("./input.txt").toString();
const reactPolymer = require("./react-polymer.js");

const polymerTwo = (input) => { 
    // let start = Date.now();
    let uniqueUnits = getUniqueUnits(input);
    let shortestPolymerLength = input.length;
    
    uniqueUnits.forEach(unit => {
        let polymer = input.replace(new RegExp(unit, "gi"), "").split("");
        polymer = reactPolymer(polymer);

        if (polymer.length < shortestPolymerLength) {
            shortestPolymerLength = polymer.length;
        }

    });
      
    // console.log((Date.now() - start)/1000);
    return shortestPolymerLength;
 };

const getUniqueUnits = (input) => {
    return new Set(input.toLowerCase());
};

// console.log(polymerTwo(input));

module.exports = polymerTwo;