const Guard = class {
    constructor(id) {
        this.id = id;
        this.totalMinutesAsleep = 0;
        this.minutesAsleep = {};
    }

    recordMinuteAsleep(minute) {
        if (this.minutesAsleep[minute]) {
            this.minutesAsleep[minute]++;
        } else {
            this.minutesAsleep[minute] = 1;
        }

        this.totalMinutesAsleep++;        
    }

    getMinuteMostAsleep() {
        let minutesToSort = this.minutesAsleep;
        const sortedMinutes = [];
        for (let minute in minutesToSort) {
            sortedMinutes.push([minute, minutesToSort[minute]]);
        }
    
        sortedMinutes.sort((min1, min2) => {
            return min2[1] - min1[1];
        });
    
        return sortedMinutes[0] !== undefined ? sortedMinutes[0] : 0;
    }
};

module.exports = Guard;