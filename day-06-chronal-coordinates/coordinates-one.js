const { parseCoordinates, getMinAndMaxCoordinates, getManhattanDistance } = require("./coordinates-helper-functions");
// const input = require("fs").readFileSync("./input.txt");

const coordinatesOne = (input) => {
    const coordinates = parseCoordinates(input);
    return getLargestArea(coordinates);
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

// console.log(coordinatesOne(input));

module.exports = coordinatesOne;
