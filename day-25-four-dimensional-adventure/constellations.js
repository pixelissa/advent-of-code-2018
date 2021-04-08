const fs = require("fs");
const Point = require("./Point");

const constellations = () => {
    const input = readLines();
    const points = parseInput(input);

    for (let i = 0; i < points.length; i++) {
        let p1 = points[i];
        
        for (let j = i + 1; j < points.length; j++) {
            let p2 = points[j];

            let dist = p1.calculateManhattanDistanceTo(p2);
            if (dist <= 3) {
                // points are close enough to form constellation
                p1.connectingPoints.push(p2);
                p2.connectingPoints.push(p1);
            }
        }
    }

    let constellations = [];

    for (let p of points) {
        if (p.constellation === null) {
            let constellation = [];
            constellations.push(constellation);
            addPointToConstellation(p, constellation);
        }
    }

    return constellations.length;
};

const readLines = () => {
    return fs.readFileSync("./input.txt").toString().split("\r\n");
};

const parseInput = (input) => {
    const points = [];

    for (let line of input) {
        let [x, y, z, t] = line.split(",").map(Number);
        points.push(new Point(x, y, z, t));
    }

    return points;
};

const addPointToConstellation = (point, constellation) => {
    if (constellation.includes(point)) {
        return;
    }

    constellation.push(point);
    point.constellation = constellation;

    for (let p of point.connectingPoints) {
        addPointToConstellation(p, constellation);
    }
};

console.log(constellations());