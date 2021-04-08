const fs = require("fs");
const Group = require("./Group");

const simulatorOne = () => {
    const input = readLines();
    let groups = parseInput(input).sort((g1, g2) => g2.initiative - g1.initiative);
    
    while (true) {
        let immuneSystemArmy = groups.filter(g => g.armyType === "immune system").sort(compareEffectivePower);
        let infectionArmy = groups.filter(g => g.armyType === "infection").sort(compareEffectivePower);

        if (!immuneSystemArmy.length || !infectionArmy.length) {
            break;
        }
        
        let enemies = groups.filter(g => g.armyType === "infection");
        for (let group of immuneSystemArmy) {
            group.selectTarget(enemies);
        }
        
        enemies = groups.filter(g => g.armyType === "immune system");
        for (let group of infectionArmy) {
            group.selectTarget(enemies);
        }
        
        for (let group of groups) {
            group.attackTarget();
        }
        
        // filter preserves sorted order, no need to sort by initiative again
        groups = groups.filter(g => !g.dead);
    } 
    
    let result = groups.reduce((acc, g) => {
        return acc + g.numOfUnits;
    }, 0);

    return result;
};

const readLines = () => {
    return fs.readFileSync("./input.txt").toString().split("\r\n");
};

const parseInput = (input) => {
    let groups = [];
    let armyType;

    for (let line of input) {
        if (line === "Immune System:") {
            armyType = "immune system";
            continue;
        }

        if (line === "") {
            continue;
        }

        if (line === "Infection:") {
            armyType = "infection";
            continue;
        }

        let [numOfUnits, hitPoints, attackDamage, initiative] = line.match(/(\d+)/g).map(Number);
        let damageType = line.match(/(\w+)\sdamage/)[1];

        let weaknesses = line.match(/weak\sto\s(\w+,? ?\w+)/);
        if (weaknesses) {
            weaknesses = weaknesses[1].split(", ");
        }

        let immunities = line.match(/immune\sto\s(\w+,? ?\w+)/);
        if (immunities) {
            immunities = immunities[1].split(", ");
        }
        
        groups.push(new Group(armyType, numOfUnits, hitPoints, attackDamage, initiative, damageType, weaknesses, immunities));    
    }
    
    return groups;
};

const compareEffectivePower = (group1, group2) => {
    return group1.compare(group2);
};

console.log(simulatorOne());