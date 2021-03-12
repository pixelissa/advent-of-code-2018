const PathNode = require("./PathNode");
const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const matches = input.match(/depth:\s(\d+)\r\ntarget:\s(\d+),(\d+)/);

const depth = parseInt(matches[1]);
const targetX = parseInt(matches[2]);
const targetY = parseInt(matches[3]);
const boundaryX = targetX * 3;
const boundaryY = targetY * 3;
const dxDy = [[0, -1], [-1, 0], [1, 0], [0, 1]];
const erosionLevels = [];

const mazeTwo = () => {
    const startNode = new PathNode(0, 0, 0, 0);
    const queue = [];
    const visited = new Set(); // `x|y|tool`

    for (let y = 0; y <= boundaryY; y++) {
        erosionLevels.push([]);
        for (let x = 0; x <= boundaryX; x++) {
            erosionLevels[y][x] = calculateErosionLevel(x, y);
        }
    }  

    queue.push(startNode);
    
    while (queue.length) {
        let currentNode = queue.shift();
        let [x, y, tool, timeCost] = [currentNode.x, currentNode.y, currentNode.tool, currentNode.timeCost];

        // stop if target found with torch
        if (x === targetX && y === targetY && tool === 0) {
            return timeCost; 
        }

        // skip if already visited x, y with current tool
        if (visited.has(currentNode.getXYToolKey())) {
            continue;
        }
        visited.add(currentNode.getXYToolKey());

        // consider changing tools
        let currentRegion = calculateRegion(x, y);
        for (let i = 0; i < 3; i++) {
            if (i !== tool && isToolValidForRegion(currentRegion, i)) {
                queue.push(new PathNode(x, y, i, timeCost + 7));
            }            
        }

        // explore adjacent regions
        for (let [dx, dy] of dxDy) {
            let adjacentX = x + dx;
            let adjacentY = y + dy;

            if (adjacentX < 0 || adjacentX >= boundaryX || adjacentY < 0 || adjacentY >= boundaryY) {
                continue;
            }

            let adjacentRegion = calculateRegion(adjacentX, adjacentY);
            if (isToolValidForRegion(adjacentRegion, tool)) {
                queue.push(new PathNode(adjacentX, adjacentY, tool, timeCost + 1));
            }                      
        }

        queue.sort((nodeA, nodeB) => {
            return nodeA.timeCost - nodeB.timeCost;
        });
    }

    return null;
};

const calculateRegion = (x, y) => {
    return erosionLevels[y][x] % 3;
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

const isToolValidForRegion = (region, tool) => {
    if (region === 0 && (tool === 0 || tool === 1)) {
        return true;
    } else if (region === 1 && (tool === 1 || tool === 2)) {
        return true;
    } else if (region === 2 && (tool === 0 || tool === 2)) {
        return true;
    }

    return false;
};

console.log(mazeTwo());