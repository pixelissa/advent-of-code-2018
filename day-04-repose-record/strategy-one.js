const input = require("fs").readFileSync("./input.txt");

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
        let sortedMinutes = [];
        for (let minute in minutesToSort) {
            sortedMinutes.push([minute, minutesToSort[minute]]);
        }
    
        sortedMinutes.sort((min1, min2) => {
            return min2[1] - min1[1];
        });
    
        return parseInt(sortedMinutes[0]);
    }
};

const strategyOne = (input) => {
    let timestamps = input.toString().split("\n").sort();
    const guards = {};
    let currentGuard;
    let sleepStart;
    let sleepEnd;
    let mostOftenAsleep;

    timestamps.forEach(t => {
        let entry = parseTimestamp(t);

        if (entry.action === "guard") {        
            if (!guards.hasOwnProperty(entry.id)) {
                guards[entry.id] = new Guard(entry.id);
            }
            
            currentGuard = guards[entry.id];
        }    
        else if (entry.action === "falls") {
            sleepStart = entry.minute;
        }
        else if (entry.action === "wakes") {
            sleepEnd = entry.minute;

            for (let i = sleepStart; i < sleepEnd; i++) {
                currentGuard.recordMinuteAsleep(i);        
            }

            if (!mostOftenAsleep || currentGuard.totalMinutesAsleep > mostOftenAsleep.totalMinutesAsleep) {
                mostOftenAsleep = currentGuard;
            }
        }
    });

    return parseInt(mostOftenAsleep.id) * mostOftenAsleep.getMinuteMostAsleep();  
};

const parseTimestamp = (t) => {
    let groups = t.match(/\[\d+\-\d+\-\d+\s\d+:(\d+)\]\s([A-Z]+)\s#*(\d*)/i);
   
    return {
        action: groups[2].toLowerCase(),
        minute: parseInt(groups[1]),
        id: groups[3]        
    }
};

console.log(strategyOne(input));

//module.exports = strategyOne;