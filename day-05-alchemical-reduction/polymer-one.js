const input = require("fs").readFileSync("./input.txt").toString();
const reactPolymer = require("./react-polymer.js");

const polymerOne = (input) => {
    let polymer = input.split("");
  
    return reactPolymer(polymer).length; 
};

console.log(polymerOne(input));

//module.exports = polymerOne;