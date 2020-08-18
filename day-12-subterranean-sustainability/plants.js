const input = require("fs").readFileSync("./input.txt").toString();

const plants = (input, generations) => {
    const [INITIAL_STATE, RULES] = parseInput(input);
    const GENERATIONS = generations;
    const BATCH_TRESHOLD = 850;
    let sum = 0;
    let growth = 0;
    let offset = 0;    
    let previousState = INITIAL_STATE;

    for (let generation = 1; generation <= GENERATIONS; generation++) {
        let nextState = [];
       
        let firstPlant = previousState.indexOf("#");
        if (firstPlant < 4) {
            let padding = 4 - firstPlant;

            for (let i = 0; i < padding; i++) {
                previousState.unshift(".");
            }

            offset += padding;
        }

        let lastPlant = previousState.lastIndexOf("#");
        if (lastPlant > previousState.length - 5) {
            let padding = lastPlant - (previousState.length - 5);

            for (let i = 0; i < padding; i++) {
                previousState.push(".");
            }
        }
        
        // first 2 indexes aren't processed so add padding
        nextState.push(".", ".");

        for (let pot = 2; pot < previousState.length - 2; pot++) {
            let group = previousState.slice(pot - 2, pot + 3).join("");
            nextState.push(RULES.get(group) || ".");
        }
        
        // last 2 indexes aren't processed so add padding
        nextState.push(".", ".");

        let newSum = getSum(nextState, offset);
        let newGrowth = newSum - (sum || 0);

        if (generation > BATCH_TRESHOLD && newGrowth === growth) {
            newSum = newSum + (GENERATIONS - generation) * growth;
            generation = GENERATIONS;
        }

        sum = newSum;
        growth = newGrowth;
        previousState = nextState;
    }
    
    return sum;
};

const parseInput = (input) => {
    let initialState = input
        .match(/:\s([\.#]+)/)[1]
        .split("");

    let rawRules = input.match(/([\.#]{5}\s=\>\s[\.#])/g);
    let rules = new Map();

    rawRules.forEach(r => {
        let split = r.split(" => ");
        rules.set(split[0], split[1]);
    });

    return [initialState, rules];
};

const getSum = (next, offset) => {
    return next
        .map((val, i) => (val === "#" ? i - offset : 0))
        .reduce((acc, curr) => acc + curr, 0);
};

console.log("After 20 generations: " + plants(input, 20));
console.log("After 50000000000 generations: " + plants(input, 50000000000));

module.exports = plants;