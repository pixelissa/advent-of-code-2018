const input = require("fs").readFileSync("./input.txt");
const INITIAL_STATE = input.toString().split("\r\n").map(e => e.split(""));
const MINUTES = 10;
const DIMENSIONS = 50;
const OPEN = ".";
const TREE = "|";
const LUMBER = "#";

const settlersOne = () => {
    let previousState = INITIAL_STATE;
    let nextState;   

    for (let minute = 1; minute <= MINUTES; minute++) {
        nextState = generateEmptyState();        
        
        for (let y = 0; y < previousState.length; y++) {
            for (let x = 0; x < previousState[y].length; x++) {
                const acreType = previousState[y][x];                
                const adjacentAcres = getAdjacentAcres(previousState, x, y);
                const newAcreType = getNewAcreType(acreType, adjacentAcres);
                nextState[y][x] = newAcreType;                
            }
        }

        previousState = nextState;
    }

    return getResourceValue(nextState);
};

const generateEmptyState = () => {
    let emptyState = [];

    for (let y = 1; y <= DIMENSIONS; y++) {
        let row = [];

        for (let x = 1; x <= DIMENSIONS; x++) {
            row.push("");
        }

        emptyState.push(row);
    }

    return emptyState;
};

const getAdjacentAcres = (state, x, y) => {
    const minBoundary = 0;
    const maxBoundary = 49;    
    let adjacent = [];

    if (y - 1 >= minBoundary) {
        if (x - 1 >= minBoundary) {
            adjacent.push(state[y - 1][x - 1]);
        }
        if (x + 1 <= maxBoundary) {
            adjacent.push(state[y - 1][x + 1]);
        }

        adjacent.push(state[y - 1][x]);
    }

    if (y + 1 <= maxBoundary) {
        if (x - 1 >= minBoundary) {
            adjacent.push(state[y + 1][x - 1]);
        }
        if (x + 1 <= maxBoundary) {
            adjacent.push(state[y + 1][x + 1]);
        }

        adjacent.push(state[y + 1][x]);
    }

    if (x - 1 >= minBoundary) {
        adjacent.push(state[y][x - 1]);
    }

    if (x + 1 <= maxBoundary) {
        adjacent.push(state[y][x + 1]);
    }

    return adjacent;
};

const getNewAcreType = (acreType, acres) => {
    const adjacentTrees = acres.filter(a => a === "|").length;
    const adjacentLumberyards = acres.filter(a => a === "#").length;

    if (acreType === TREE && adjacentLumberyards >= 3) {
        return LUMBER;
    }
    else if (acreType === OPEN && adjacentTrees >= 3) {
        return TREE;
    }
    else if (acreType === LUMBER) {
        return adjacentLumberyards >= 1 && adjacentTrees >= 1 ? LUMBER : OPEN;
    }
    else {
        return acreType;
    }
};

const getResourceValue = (state) => {
    let woodAcres = 0;
    let lumberyardAcres = 0;
    
    for (let y = 0; y < state.length; y++) {
        for (let x = 0; x < state[y].length; x++) {
            if (state[y][x] === TREE) {
                woodAcres++;
            } else if (state[y][x] === LUMBER) {
                lumberyardAcres++;
            }
        }
    }

    return woodAcres * lumberyardAcres;
};

console.log(settlersOne());
