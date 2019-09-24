const boxes = require("fs")
    .readFileSync("./input.txt")
    .toString()
    .split("\n");

function checksum () {
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

    console.log(doublesCounter * triplesCounter);
    return doublesCounter * triplesCounter;   
}

checksum();


