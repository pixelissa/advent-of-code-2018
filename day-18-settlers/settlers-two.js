const input = require("fs").readFileSync("./input.txt");
const INITIAL_STATE = input.toString().split("\r\n").map(e => e.split(""));
const MINUTES = 1000000000;
const DIMENSIONS = 50;
const OPEN = ".";
const TREE = "|";
const LUMBER = "#";

const settlersTwo = () => {
    let state = INITIAL_STATE;
    let stateHistory = [];

    let flatInitialState = flattenState(INITIAL_STATE);
    stateHistory.push(flatInitialState);

    for (let minute = 1; minute <= 1000000000; minute++) {
        state = computeNextState(state);
        let flatState = flattenState(state);

        if (stateHistory.includes(flatState)) {
            const firstOccurence = stateHistory.indexOf(flatState);
            const patternLength = stateHistory.length - firstOccurence;
            const remainingMinutes = (MINUTES - minute + 1) % patternLength;
            
            for (let i = 0; i < remainingMinutes - 1; i++) {
                state = computeNextState(state);
            }
            
            break;
        }
        else {
            stateHistory.push(flatState);
        }                            
    }

    return getResourceValue(state);
};

const flattenState = (state) => {
    let result = "";

    for (let y = 0; y < state.length; y++) {
        result += state[y].join("");
    }

    return result;
};

const computeNextState = (previousState) => {
    const nextState = generateEmptyState();        
        
    for (let y = 0; y < previousState.length; y++) {
        for (let x = 0; x < previousState[y].length; x++) {
            const acreType = previousState[y][x];                
            const adjacentAcres = computeAdjacentAcres(previousState, x, y);
            const newAcreType = computeNewAcreType(acreType, adjacentAcres);
            nextState[y][x] = newAcreType;
        }
    }
    
    return nextState;
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

const computeAdjacentAcres = (state, x, y) => {
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

const computeNewAcreType = (acreType, adjacentAcres) => {
    const adjacentTrees = adjacentAcres.filter(a => a === "|").length;
    const adjacentLumberyards = adjacentAcres.filter(a => a === "#").length;

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

console.log(settlersTwo());

