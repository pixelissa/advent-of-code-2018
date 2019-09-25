//const input = require("fs").readFileSync("./input.txt");

const checksumTwo = (input) => {
    let boxes = input
        .toString()
        .split("\n");

    for (let i = 0; i < boxes.length; i++) {
        for (let j = 0; j < boxes.length; j++) {
            if (checkDifference(boxes[i], boxes[j]) === 1) {
                return getCommonLetters(boxes[i], boxes[j]).join("");
            }
        }
    }
};

const checkDifference = (firstBox, secondBox) => {
    let differences = 0;

    for (let i = 0; i < firstBox.length; i++) {
        if (firstBox[i] !== secondBox[i]) {
            differences++;
        }
    }

    return differences;    
};

const getCommonLetters = (firstBox, secondBox) => {
    return firstBox
        .split("")
        .filter((char) => {
            return secondBox
                .split("")
                .indexOf(char) > -1;
    });
};

//console.log(checksumTwo(input));

module.exports = checksumTwo;