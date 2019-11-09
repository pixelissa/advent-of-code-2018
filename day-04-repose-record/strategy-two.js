const input = require("fs").readFileSync("./input.txt");
const guard = require("./Guard.js");
const parseTimestamp = require("./parse-timestamp.js");

const strategyTwo = (input) => {
    let timestamps = input.toString().split("\n").sort();
    const guardsMap = {};
    let currentGuard;
    let sleepStart;
    let sleepEnd;

    timestamps.forEach(t => {
        let entry = parseTimestamp(t);

        if (entry.action === "guard") {        
            if (!guardsMap.hasOwnProperty(entry.id)) {
                guardsMap[entry.id] = new guard(entry.id);
            }
            
            currentGuard = guardsMap[entry.id];
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
    for (const key in guardsMap) {
        const guard = guardsMap[key];
        mostAsleepMinutes.push([guard.id, guard.getMinuteMostAsleep()]);
    }

    mostAsleepMinutes.sort((min1, min2) => {
        return min2[1][1] - min1[1][1];
    });
   
    return parseInt(mostAsleepMinutes[0][0]) * parseInt(mostAsleepMinutes[0][1][0]);
};

console.log(strategyTwo(input));

//module.exports = strategyTwo;