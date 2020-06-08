const Worker = class {
    constructor() {
        this.available = true;
        this.timeLeftToWork = 0;
        this.step = "";
    }

    assignWork(step) {
        this.available = false;
        this.timeLeftToWork = step.charCodeAt(0) - 4;
        this.step = step;
    }

    work(time) {
        if (this.isWorking()) {
            this.timeLeftToWork -= time;

            if (this.timeLeftToWork === 0) {
                this.available = true;
                this.step = "";
            }
        }
    }

    isWorking() {
        return !this.available;
    }
};

module.exports = Worker;