//const input = require("fs").readFileSync("./input.txt");

const coordinatesOne = (input) => {
    const coordinates = parseCoordinates(input);
    return getLargestArea(coordinates);
};

const parseCoordinates = (rawInput) => {
    const parsedCoordinates = [];

    rawInput.toString()
        .split("\n")
        .forEach((c) => {
        let coordinateSet = c.split(",");
        parsedCoordinates.push(
            {
                x: parseInt(coordinateSet[0]),
                y: parseInt(coordinateSet[1])
                
            }
        );        
    });

    return parsedCoordinates;
};

const getLargestArea = (coordinates) => {
    const boundaries = getMinAndMaxCoordinates(coordinates);

    for (let y = boundaries.minY; y <= boundaries.maxY; y++) {
        for (let x = boundaries.minX; x <= boundaries.maxX; x++) {
            let closestCoordinate = findClosestCoordinate(x, y, coordinates);
            
            if (closestCoordinate) {
                incrementArea(closestCoordinate);
                determineIfAreaIsInfinite(closestCoordinate, boundaries, x, y);
            }
        }
    }
    
    let result = coordinates.filter(c => !c.isInfinite)
        .sort((a, b) => b.area - a.area);    
    
    return result[0].area;        
};

const getMinAndMaxCoordinates = (coordinates) => {
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;

    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    coordinates.forEach((c) => {
        minX = Math.min(minX, c.x);
        minY = Math.min(minY, c.y);

        maxX = Math.max(maxX, c.x);
        maxY = Math.max(maxY, c.y);
    });

    return {
        minX: minX,
        minY: minY,
        maxX: maxX,
        maxY: maxY
    }
};

const findClosestCoordinate = (x, y, coordinates) => {
    let shortestDistance = Number.POSITIVE_INFINITY;
    let closestCoordinate = null;

    coordinates.forEach(currentCoordinate => {
        let distance = getManhattanDistance(x, y, currentCoordinate);
        
        if (distance < shortestDistance) {
            shortestDistance = distance;
            closestCoordinate = currentCoordinate;
        }
        else if (distance === shortestDistance) {
            closestCoordinate = null;
        }
    });

    return closestCoordinate;
};

const incrementArea = (closestCoordinate) => {
    !closestCoordinate.area ? closestCoordinate.area = 1 : closestCoordinate.area++;
};

const determineIfAreaIsInfinite = (coordinate, boundaries, x, y) => {
    if (!coordinate.isInfinite) {
        if (x === boundaries.minX || y === boundaries.minY || x === boundaries.maxX || y === boundaries.maxY) {
            coordinate.isInfinite = true;
        }                
    }
};

const getManhattanDistance = (x, y, currentCoordinate) => {
    return Math.abs(currentCoordinate.x - x) + Math.abs(currentCoordinate.y - y);
};

//console.log(coordinatesOne(input));

module.exports = coordinatesOne;
