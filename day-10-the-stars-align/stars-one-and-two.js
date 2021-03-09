const input = require("fs").readFileSync("./input.txt");

const starsOneAndTwo = (input) => {
    let points = parseInput(input);
    let data = {
        points: points,
        boundaries: getBoundaries(points),
        minWidth: null,
        minHeight: null,
        seconds: 0,
        message: false
    };

    data.minWidth = data.boundaries.width;
    data.minHeight = data.boundaries.height;

    while (!data.message) {
        let newPoints = updatePointPositions(data.points);
        let newBoundaries = getBoundaries(newPoints);
        let closer = false;

        if (newBoundaries.height < data.minHeight) {
            data.minHeight = newBoundaries.height;
            closer = true;
        }

        if (newBoundaries.width < data.minWidth) {
            data.minWidth = newBoundaries.width;
            closer = true;
        }

        if (closer) {
            data.seconds++;
            data.points = newPoints;
            data.boundaries = newBoundaries;                    
        }
        else {
            data.message = true;
        }
    }

    drawMessage(data);
    console.log(`It would've taken ${data.seconds} seconds for the message to appear.`);
};


const parseInput = (input) => {
    const parsed = [];

    input.toString()
        .split("\n")
        .forEach((p) => {
            let groups = p.match(/position=<\s*(-?\d+),\s*(-?\d+)>\svelocity=<\s*(-?\d+),\s*(-?\d+)/);
            let point = {
                x: parseInt(groups[1]),
                y: parseInt(groups[2]),
                vx: parseInt(groups[3]),
                vy: parseInt(groups[4])
            };

            parsed.push(point);
    });

    return parsed;
};

const getBoundaries = (points) => {
    let {minX, minY, maxX, maxY} = points.reduce((a, p) => ({
        minX: Math.min(a.minX, p.x),
        minY: Math.min(a.minY, p.y),
        maxX: Math.max(a.maxX, p.x),
        maxY: Math.max(a.maxY, p.y)
    }), {minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity});

    return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY,
        height: maxY - minY + 1,
        width: maxX - minX + 1
    };
};

const updatePointPositions = (points) => {
    return points.map(p => {
        return {
            x: p.x + p.vx,
            y: p.y + p.vy,
            vx: p.vx,
            vy: p.vy
        };
    });    
};

const drawMessage = (data) => {
    // compact points into smaller area
    let points = data.points.map(p => {
        return {
            x: p.x - data.boundaries.minX,
            y: p.y - data.boundaries.minY
        };
    });

    let grid = [];

    for (let i = 0; i < data.boundaries.height; i++) {
        grid.push([]);
        
        for (let j = 0; j < data.boundaries.width; j++) {
            grid[i][j] = ".";
        }
    }

    points.forEach(p => {
        grid[p.y][p.x] = "#";        
    });

    grid.forEach(row => {
       console.log(row.join(" "));       
    });
};

starsOneAndTwo(input);

module.exports = starsOneAndTwo;