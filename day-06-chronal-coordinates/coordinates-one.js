const input = require("fs").readFileSync("./input.txt").toString();

// TODO - fix lets and consts
// TODO - put code in for loops in separate function
// TODO - check if y/x are within boundaries, in which case set count to 0 (to ignore it)
// TODO - array of counts. keep track of count at each position of coordinates other than boundaries and return highest number

const coordinatesOne = (input) => {   
    let coordinates = parseCoordinates(input);
    let grid = createGrid(coordinates);
    
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            let shortestDistance = Number.POSITIVE_INFINITY;
            let shortestDistanceIndex = -1;

            for (let currentCoor = 0; currentCoor < coordinates.length; currentCoor++) {
                let xCoor = coordinates[currentCoor][0];
                let yCoor = coordinates[currentCoor][1];
                let distance = (Math.abs(xCoor - x) + Math.abs(yCoor - y));

                if (distance < shortestDistance) {
                    shortestDistance = distance;
                    shortestDistanceIndex = currentCoor;
                }
                else if (distance === shortestDistance) {
                    shortestDistanceIndex = -1;
                }

                if (shortestDistance === 0) {
                    break;
                } 

            }

            grid[y][x] = shortestDistanceIndex;
        }
    }

    console.log(grid);


};

const parseCoordinates = (rawInput) => {
    let parsedCoordinates = [];

    rawInput.split("\r\n").forEach((coor) => {
        let splitCoor = coor.split(",");        
        parsedCoordinates.push([parseInt(splitCoor[0]), parseInt(splitCoor[1])]);
    });
    
    return parsedCoordinates;
};

const createGrid = (coordinates) => {
    let grid = [];
    let highestXandY = getHighestXandY(coordinates);
    
    for (let y = 0; y <= highestXandY[1]; y++) {
        grid.push([]);
        for (let x = 0; x <= highestXandY[0]; x++) {
            grid[y].push(undefined);
        }
    }

    return grid;    
};

const getHighestXandY = (coordinates) => {
    let highestX = 0;
    let highestY = 0;
    
    coordinates.forEach((coor) => {
        let currentX = coor[0];
        let currentY = coor[1];

        if (currentX > highestX) {
            highestX = currentX;
        }

        if (currentY > highestY) {
            highestY = currentY;
        }
    });

    return [highestX, highestY];
}

console.log(coordinatesOne(input));