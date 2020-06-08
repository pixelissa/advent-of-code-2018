const { parseInput, popNextStep } = require("./steps-helper-functions");
const input = require("fs").readFileSync("./input.txt");
const Graph = require("./Graph");
const WorkerPool = require("./WorkerPool");

const stepsTwo = (input) => {
    let allSteps = new Graph(parseInput(input));
    let availableSteps = allSteps.getAvailableSteps();
    const NUMBER_OF_WORKERS = 5;
    const workers = new WorkerPool(NUMBER_OF_WORKERS);
    let timeElapsed = 0; 
    
    while (allSteps.hasNodes() || workers.areWorking()) {
        allSteps.removeEdgelessNodes();
        
        while (availableSteps.length) {          
            if (workers.hasAvailableWorker()) {
                let step = popNextStep(availableSteps);
                workers.assignWorker(step);
            }
            else {
                break;
            }
        }
        
        let completedWork = workers.completeShortestStep();

        allSteps.removeEdgeFromNodes(completedWork.step);
        timeElapsed += completedWork.timeElapsed;

        availableSteps = availableSteps.concat(allSteps.getAvailableSteps());
    }

    return timeElapsed;
};

console.log(stepsTwo(input));

//module.exports = stepsTwo;