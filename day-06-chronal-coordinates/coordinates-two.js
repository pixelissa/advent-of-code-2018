const { parseCoordinates, getMinAndMaxCoordinates, getManhattanDistance } = require("./coordinates-helper-functions");
//const input = require("fs").readFileSync("./input.txt");

const coordinatesTwo = (input, maxTotalDistance) => {
    const coordinates = parseCoordinates(input);
    return getRegionSize(coordinates, maxTotalDistance);
};

const getRegionSize = (coordinates, maxTotalDistance) => {
    const boundaries = getMinAndMaxCoordinates(coordinates);
    let totalRegionSize = 0;

    for (let y = boundaries.minY; y <= boundaries.maxY; y++) {
        for (let x = boundaries.minX; x <= boundaries.maxX; x++) {
            let sumOfAllManhattanDistances = getSumofManhattanDistances(x, y, coordinates);
            if (sumOfAllManhattanDistances < maxTotalDistance) {
                totalRegionSize++;
            }            
        }
    }
    
    return totalRegionSize;            
};

const getSumofManhattanDistances = (x, y, coordinates) => {
    let sumOfDistances = 0;

    coordinates.forEach(currentCoordinate => {
        let distance = getManhattanDistance(x, y, currentCoordinate);
        sumOfDistances += distance;
    });

    return sumOfDistances;
};

//console.log(coordinatesTwo(input, 10000));

module.exports = coordinatesTwo;