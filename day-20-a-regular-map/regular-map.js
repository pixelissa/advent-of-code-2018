const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();

const directions = {
    "N": [0, -1],
    "E": [1, 0],
    "S": [0, 1],
    "W": [-1, 0]
};

const stack = [];

// key: hashed x/y coordinate, val: smallest distance to starting point
const rooms = new Map();

// Starting position
let [x, y] = [0, 0];

// Multiply by a prime number
const hashCoordinates = (x, y) => {
    return x * 10007 + y;
};

const regularMap = () => {
    rooms.set(hashCoordinates(x, y), 0);
    
    const mapDirections = input.match(/[^^$]/gm);
    
    mapDirections.forEach(d => {
        switch (d) {
            case "N":
            case "E":
            case "S":
            case "W":
                let [nextX, nextY] = [x + directions[d][0], y + directions[d][1]];
                let nextRoom = hashCoordinates(nextX, nextY);
                let newDistance = rooms.get(hashCoordinates(x, y)) + 1;
                
                if (rooms.has(nextRoom)) {
                    rooms.set(nextRoom, Math.min(rooms.get(nextRoom), newDistance));
                }
                else {
                    rooms.set(nextRoom, newDistance);                    
                }

                [x, y] = [nextX, nextY];                
                break;

            case "(":
                stack.push([x, y]);
                break;
            
            case "|":
                [x, y] = stack[stack.length - 1];
                break;

            case ")":
                [x, y] = stack.pop();
                break;

            default: break;
        }
    });

    // Part 1:
    console.log(Math.max(...rooms.values()));

    // Part 2:
    console.log([...rooms.values()].filter(val => val >= 1000).length);
};

regularMap();