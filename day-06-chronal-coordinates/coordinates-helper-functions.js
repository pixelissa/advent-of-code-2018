exports.parseCoordinates = (input) => {
    const parsedCoordinates = [];

    input.toString()
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

exports.getMinAndMaxCoordinates = (coordinates) => {
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

exports.getManhattanDistance = (x, y, currentCoordinate) => {
    return Math.abs(currentCoordinate.x - x) + Math.abs(currentCoordinate.y - y);
};