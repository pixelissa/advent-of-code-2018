//const input = require("fs").readFileSync("./input.txt");

const checksum = (input) => {
    let boxes = input
        .toString()
        .split("\n");
    let doublesCounter = 0;
    let triplesCounter = 0;
    
    boxes.forEach((box) => {    
        let letters = {};
        let currentBoxChars = box.split("");
    
        currentBoxChars.forEach((char) => {
            letters[char] = (letters[char] !== undefined) ? letters[char] + 1 : 1;
        });
    
        let tallies = new Set(Object.values(letters));
    
        if (tallies.has(2)) {
            doublesCounter++;
        }
    
        if (tallies.has(3)) {
            triplesCounter++;
        }    
    });

    return doublesCounter * triplesCounter;   
};

//console.log(checksum(input));

module.exports = checksum;


