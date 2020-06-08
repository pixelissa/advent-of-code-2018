const { parseInput, popNextStep } = require("./steps-helper-functions");
const input = require("fs").readFileSync("./input.txt");
const Graph = require("./Graph");

const stepsOne = (input) => {    
    let allSteps = new Graph(parseInput(input));
    let availableSteps = allSteps.getAvailableSteps();
    let result = [];
    
    while (availableSteps.length) {
        allSteps.removeEdgelessNodes();

        let next = popNextStep(availableSteps);
        result.push(next);
        allSteps.removeEdgeFromNodes(next);

        availableSteps = availableSteps.concat(allSteps.getAvailableSteps());
    }

    return result.join("");
};

console.log(stepsOne(input));

module.exports = stepsOne;