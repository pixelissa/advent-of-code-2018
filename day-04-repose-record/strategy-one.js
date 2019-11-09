const input = require("fs").readFileSync("./input.txt");
const guard = require("./Guard.js");
const parseTimestamp = require("./parse-timestamp.js");

const strategyOne = (input) => {
    let timestamps = input.toString().split("\n").sort();
    const guardsMap = {};
    let currentGuard;
    let sleepStart;
    let sleepEnd;
    let mostOftenAsleep;

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

            if (!mostOftenAsleep || currentGuard.totalMinutesAsleep > mostOftenAsleep.totalMinutesAsleep) {
                mostOftenAsleep = currentGuard;
            }
        }
    });

    return parseInt(mostOftenAsleep.id) * parseInt(mostOftenAsleep.getMinuteMostAsleep()[0]); 
};

console.log(strategyOne(input));

//module.exports = strategyOne;