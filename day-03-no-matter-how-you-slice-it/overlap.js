//const input = require("fs").readFileSync("./input.txt");

const overlap = (input) => {
    let claims = input.toString().split("\n");
    let fabricGrid = {};
    
    claims.forEach(c => {
        let claim = parseClaim(c);

        for (let i = 0; i < claim.width; i++) {
            let x = claim.xOffset + i;

            for (let j = 0; j < claim.height; j++) {
                let y = claim.yOffset + j;

                fabricGrid[`${x},${y}`] = (fabricGrid[`${x},${y}`] !== undefined) ? fabricGrid[`${x},${y}`] + 1 : 1; 
            }   
        }
    });

    let overlappedSpots = Object.values(fabricGrid);  

    return overlappedSpots.filter(spot => spot >= 2).length;
};

const parseClaim = (c) => {
    let groups = c.match(/#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)/);
    return {
        xOffset: parseInt(groups[2]),
        yOffset: parseInt(groups[3]),
        width: parseInt(groups[4]),
        height: parseInt(groups[5])
    };
};

//console.log(overlap(input));

module.exports = overlap;


