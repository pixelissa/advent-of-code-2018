//const input = require("fs").readFileSync("./input.txt");

const noOverlap = (input) => {
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

    for (let c = 0; c < claims.length; c++) {
        let claim = parseClaim(claims[c]);
        let available = new Set();

        for (let i = 0; i < claim.width; i++) {
            let x = claim.xOffset + i;

            for (let j = 0; j < claim.height; j++) {
                let y = claim.yOffset + j;

                available.add(fabricGrid[`${x},${y}`]);
            }   
        }

        if (available.size === 1 && available.has(1)) {
            return claim.id;
        }
    }
};

const parseClaim = (c) => {
    let groups = c.match(/#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)/);
    return {
        id: parseInt(groups[1]),
        xOffset: parseInt(groups[2]),
        yOffset: parseInt(groups[3]),
        width: parseInt(groups[4]),
        height: parseInt(groups[5])
    }; 
};

//console.log(noOverlap(input));

module.exports = noOverlap;


