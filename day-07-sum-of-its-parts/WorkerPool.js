const Worker = require("./Worker");

const WorkerPool = class {    
    constructor(numberOfWorkers) {
        this.workers = [];
        for (let i = 1; i <= numberOfWorkers; i++) {
            this.workers.push(new Worker());
        }
    }

    areWorking() {
        return this.workers.some(w => w.isWorking());
    }
    
    hasAvailableWorker() {
        return this.getNextWorker() >= 0;
    }

    getNextWorker() {
        const nextAvailable = (w) => !w.isWorking();  
        return this.workers.findIndex(nextAvailable);
    }
    
    assignWorker(step) {
        this.workers[this.getNextWorker()].assignWork(step);    
    }

    completeShortestStep() {
        let copy = this.workers
            .filter(w => w.isWorking())
            .sort((a, b) => a.timeLeftToWork - b.timeLeftToWork);
        
        let shortest = copy[0];
        let shortestStep = shortest.step;
        let shortestTime = shortest.timeLeftToWork;
        
        this.workers.forEach(w => w.work(shortestTime));

        return {
            step: shortestStep,
            timeElapsed: shortestTime
        };
    }
};

module.exports = WorkerPool;

