const boxes = require("fs")
    .readFileSync("./input.txt")
    .toString()
    .split("\n");

function checksumTwo() {
    for (let i = 0; i < boxes.length; i++) {
        for (let j = 0; j < boxes.length; j++) {
            if (checkDifference(boxes[i], boxes[j]) === 1) {
                return getCommonLetters(boxes[i], boxes[j]).join("");
            }
        }
    }
}

function checkDifference(firstBox, secondBox) {
    let differences = 0;

    for (let i = 0; i < firstBox.length; i++) {
        if (firstBox[i] !== secondBox[i]) {
            differences++;
        }
    }

    return differences;    
}

function getCommonLetters(firstBox, secondBox) {
    return firstBox
        .split("")
        .filter((char) => {
            return secondBox
                .split("")
                .indexOf(char) > -1;
    });
}

checksumTwo();