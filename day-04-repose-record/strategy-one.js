const input = require("fs").readFileSync("./input.txt");
const guard = require("./Guard.js");
const parseTimestamp = require("./parse-timestamp.js");

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

            if (!mostOftenAsleep || currentGuard.totalMinutesAsleep > mostOftenAsleep.totalMinutesAsleep) {
                mostOftenAsleep = currentGuard;
            }
        }
    });

    return parseInt(mostOftenAsleep.id) * mostOftenAsleep.getMinuteMostAsleep();  
};

console.log(strategyOne(input));

//module.exports = strategyOne;