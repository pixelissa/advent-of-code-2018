const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const matches = input.match(/depth:\s(\d+)\r\ntarget:\s(\d+),(\d+)/);

const depth = parseInt(matches[1]);
const targetX = parseInt(matches[2]);
const targetY = parseInt(matches[3]);
const erosionLevels = [];

const mazeOne = () => {
    let totalRisk = 0;

    for (let y = 0; y <= targetY; y++) {
        erosionLevels.push([]);
        for (let x = 0; x <= targetX; x++) {
            erosionLevels[y][x] = calculateErosionLevel(x, y);
            totalRisk += calculateRegion(x, y);
        }
    }

    return totalRisk;
};

const calculateRegion = (x, y) => {
    return calculateErosionLevel(x, y) % 3;
};

const calculateErosionLevel = (x, y) => {
    let level = erosionLevels[y][x];
    if (level) {
        return level;
    } else {
        return (calculateGeologicIndex(x, y) + depth) % 20183;
    }   
};

const calculateGeologicIndex = (x, y) => {
    if (x === 0 && y === 0) {
        return 0;
    } else if (x === targetX && y === targetY) {
        return 0;
    } else if (x === 0) {
        return y * 48271;
    } else if (y === 0) {
        return x * 16807;
    } else {
        return calculateErosionLevel(x - 1, y) * calculateErosionLevel(x, y - 1);
    }
};

console.log(mazeOne());