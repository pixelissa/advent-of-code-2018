const input = require("fs").readFileSync("./input.txt");
const guard = require("./Guard.js");
const parseTimestamp = require("./parse-timestamp.js");

const strategyTwo = (input) => {
    let timestamps = input.toString().split("\n").sort();
    const guards = {};
    let currentGuard;
    let sleepStart;
    let sleepEnd;

    timestamps.forEach(t => {
        let entry = parseTimestamp(t);

        if (entry.action === "guard") {        
            if (!guards.hasOwnProperty(entry.id)) {
                guards[entry.id] = new guard(entry.id);
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
        }
    });

    const mostAsleepMinutes = [];
    for (const guard in guards) {
        mostAsleepMinutes.push([guards[guard].id, guards[guard].getMinuteMostAsleep()]);
    }

    mostAsleepMinutes.sort((min1, min2) => {
        return min2[1][1] - min1[1][1];
    });
   
    return parseInt(mostAsleepMinutes[0][0]) * parseInt(mostAsleepMinutes[0][1][0]);
};

console.log(strategyTwo(input));

//module.exports = strategyTwo;