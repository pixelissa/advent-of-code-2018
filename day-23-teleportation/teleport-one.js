const fs = require("fs");
const Bot = require("./Bot");
const Position = require("./Position");

const teleportOne = () => {
    const input = readLines();
    const [bots, strongestBot] = parseInput(input);
    
    let inRange = 0;
    let max = bots.length;
    let strongestRadius = strongestBot.radius;
    
    for (let i = 0; i < max; i++) {
        if (getManhattanDistance(bots[i].pos, strongestBot.pos) <= strongestRadius) {
            inRange++;
        }
    }

    return inRange;
};

const readLines = () => {
    return fs.readFileSync("./input.txt").toString().split("\r\n");
};

const parseInput = (input) => {
    const regex = /^pos=<(-?\d+),(-?\d+),(-?\d+)>,\sr=(\d+)$/;
    const bots = [];
    let strongest = new Bot(new Position(0, 0, 0), 0);   

    for (let line of input) {
        const matches = line.match(regex);
        const position = new Position(parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3]));
        const bot = new Bot(position, parseInt(matches[4]));
        
        if (bot.radius > strongest.radius) {
            strongest = bot;
        }
        
        bots.push(bot);
    }

    return [bots, strongest];
};

const getManhattanDistance = (pos1, pos2) => {
    let xDiff = Math.abs(pos1.x - pos2.x);
    let yDiff = Math.abs(pos1.y - pos2.y);
    let zDiff = Math.abs(pos1.z - pos2.z);
    
    return xDiff + yDiff + zDiff;
};

console.log(teleportOne());