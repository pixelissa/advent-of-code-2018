const fs = require("fs");
const Group = require("./Group");

const simulatorTwo = () => {
    const input = readLines();
    let boost = 1;
    
    while (true) {
        let groups = parseInput(input).sort((g1, g2) => g2.initiative - g1.initiative);

        for (let group of groups) {
            if (group.armyType === "immune system") {
                group.applyBoost(boost);
            }
        }
        
        let totalNumUnits = calculateTotalNumUnits(groups);
        let stalemate = false;

        while (!stalemate) {
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

            let updatedNumUnits = calculateTotalNumUnits(groups);

            if (updatedNumUnits === totalNumUnits) {
                stalemate = true;
            } else {
                totalNumUnits = updatedNumUnits;
            }
        }

        let winner;

        if (stalemate) {
            winner = "infection";
        } else {
            winner = groups[0].armyType;
        }

        if (winner === "immune system") {
            return calculateTotalNumUnits(groups);
        }

        boost++;
    }
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

const calculateTotalNumUnits = (groups) => {
    return groups.reduce((acc, g) => {
        return acc + g.numOfUnits;
    }, 0);
};

console.log(simulatorTwo());