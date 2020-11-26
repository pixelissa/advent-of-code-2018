const input = require("fs").readFileSync("./input.txt").toString().split("\r\n");

const reservoir = () => {
    const clayLocations = parse(input);
    const clayBoundaries = calculateClayBoundaries(clayLocations);
    const xOffset = clayBoundaries.minX - 1;
    const grid = generateGrid(clayLocations, clayBoundaries, xOffset);   
    let water = 0;

    // Water spring at x=500, y=0
    flowWater(grid, 500 - xOffset, 0);

    for (let y = clayBoundaries.minY; y <= clayBoundaries.maxY; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            // if (grid[y][x] === "|" || grid[y][x] === "~") {
            //     water++;
            // }
            if (grid[y][x] === "~") {
                water++;
            }
        }
    }
    
    return water;
};

const parse = (input) => {
    const regex = /(\w{1})=(\d+),\s\w{1}=(\d+)\.\.(\d+)/;
    const parsed = [];

    input.forEach(line => {
        const matchGroups = line.match(regex);
        const firstAxisType = matchGroups[1];
        const firstAxisValue = parseInt(matchGroups[2]);
        const secondAxisStart = parseInt(matchGroups[3]);
        const secondAxisEnd = parseInt(matchGroups[4]);
        
        if (firstAxisType === "x") {
            for (let i = secondAxisStart; i <= secondAxisEnd; i++) {
                parsed.push({
                    "x": firstAxisValue,
                    "y": i
                });
            }
        }
        else if (firstAxisType === "y") {
            for (let i = secondAxisStart; i <= secondAxisEnd; i++) {
                parsed.push({
                    "x": i,
                    "y": firstAxisValue
                });
            }
        } 
    });
    
    return parsed;
};

const calculateClayBoundaries = (coordinates) => {
    let {minX, minY, maxX, maxY} = coordinates.reduce((acc, coor) => ({
        minX: Math.min(acc.minX, coor.x),
        minY: Math.min(acc.minY, coor.y),
        maxX: Math.max(acc.maxX, coor.x),
        maxY: Math.max(acc.maxY, coor.y)
    }), {minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity});

    return {
        minX: minX,
        minY: minY,
        maxX: maxX,        
        maxY: maxY
    }
};

const generateGrid = (clayLocations, clayBoundaries, xOffset) => {
    const grid = [];

    for (let y = 0; y <= clayBoundaries.maxY + 1; y++) {
        let row = [];
        for (let x = xOffset; x <= clayBoundaries.maxX + 1; x++) {
            row.push(".");
        }
        
        grid.push(row);
    }

    clayLocations.forEach(coor => {
        grid[coor.y][coor.x - xOffset] = "#";
    });
    
    return grid;
};

const flowWater = (grid, x, y, flowDirection) => {
    // stop counting water after reaching maxY boundary
    if (y === grid.length - 1) {
        return;
    }
    
    // sand --> water flows through
    if (grid[y][x] === ".") {
        grid[y][x] = "|";
    }        

    // sand --> water goes down
    if (grid[y + 1][x] === ".") {
        flowWater(grid, x, y + 1);
    }

    // clay --> water can't flow through
    if (grid[y][x] === "#") {
        return x;
    }

    // below is either clay or settled water --> check left and right directions
    if (grid[y + 1][x] === "#" || grid[y + 1][x] === "~") {
        if (flowDirection === "left") {
            return flowWater(grid, x - 1, y, "left");
        }

        if (flowDirection === "right") {
            return flowWater(grid, x + 1, y, "right");
        }

        let leftBoundary = flowWater(grid, x - 1, y, "left");
        let rightBoundary = flowWater(grid, x + 1, y, "right");

        // settle the water if within clay boundaries
        if (grid[y][leftBoundary] === "#" && grid[y][rightBoundary] === "#") {
            for (let i = leftBoundary + 1; i < rightBoundary; i++) {
                grid[y][i] = "~";
            }
        }
    }
    else {
        return x;
    }
};

console.log(reservoir(input));