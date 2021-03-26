const fs = require("fs");
const Bot = require("./Bot");
const Position = require("./Position");
const ORIGIN = new Position(0, 0, 0);

const teleportTwo = () => {
    const input = readLines();
    const [bots, min, max] = parseInput(input);
    
    let searchSize = Math.floor(max.x - min.x / 2);
    let bestCoordinate = new Position(0, 0, 0);
    
    while (searchSize > 0) {
        let bestCount = 0;
        
        for (let x = min.x; x <= max.x; x += searchSize) {
            for (let y = min.y; y <= max.y; y += searchSize) {
                for (let z = min.z; z <= max.z; z += searchSize) {
                    let currentPos = new Position(x, y, z);
                    let count = 0;
                    
                    for (let bot of bots) {
                        if (getManhattanDistance(currentPos, bot.pos) - bot.radius < searchSize) {
                            count++;
                        }
                    }
                    
                    if (count > bestCount) {
                        bestCount = count;
                        bestCoordinate = currentPos;
                    }
                    else if (count === bestCount && getManhattanDistance(currentPos) < getManhattanDistance(bestCoordinate)) {
                        bestCoordinate = currentPos;
                    }
                }
            }
        }
        
        // Narrow bounding box centered around bestCoordinate
        min.x = bestCoordinate.x - searchSize;
        min.y = bestCoordinate.y - searchSize;
        min.z = bestCoordinate.z - searchSize;

        max.x = bestCoordinate.x + searchSize;
        max.y = bestCoordinate.y + searchSize;
        max.z = bestCoordinate.z + searchSize;

        // Halving the search radius
        searchSize = Math.floor(searchSize / 2);
    }

   return getManhattanDistance(bestCoordinate);
};

const readLines = () => {
    return fs.readFileSync("./input.txt").toString().split("\r\n");
};

const parseInput = (input) => {
    const regex = /^pos=<(-?\d+),(-?\d+),(-?\d+)>,\sr=(\d+)$/;
    const bots = [];
    let min = new Position(0, 0, 0);
    let max = new Position(0, 0, 0);

    for (let line of input) {
        const matches = line.match(regex);
        const position = new Position(parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3]));
        const bot = new Bot(position, parseInt(matches[4]));

        min.x = Math.min(min.x, bot.pos.x);
        min.y = Math.min(min.y, bot.pos.y);
        min.z = Math.min(min.z, bot.pos.z);

        max.x = Math.max(max.x, bot.pos.x);
        max.y = Math.max(max.y, bot.pos.y);
        max.z = Math.max(max.z, bot.pos.z);

        bots.push(bot);
    }
    
    return [bots, min, max];
};

const getManhattanDistance = (pos1, pos2 = ORIGIN) => {
    let xDiff = Math.abs(pos1.x - pos2.x);
    let yDiff = Math.abs(pos1.y - pos2.y);
    let zDiff = Math.abs(pos1.z - pos2.z);
    
    return xDiff + yDiff + zDiff;
};

console.log(teleportTwo());