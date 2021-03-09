const input = require("fs").readFileSync("./input.txt").toString();
const Unit = require("./Unit");

const beverageOne = (input) => {
    const gameMap = parse(input);
    const goblins = new Map();
    const elves = new Map();
    let round = 0;
    
    initializeMapAndUnits(gameMap, goblins, elves);    
    
    while (true) {
        if (playRound(gameMap, goblins, elves)) {
            round++;
        }
        else {
            break;
        }       
    }
    
    return round * sumOfRemainingHitPoints(goblins, elves);
};

const parse = (input) => {
    let parsed = [];
    
    input.split("\r\n").forEach(e => {
        parsed.push(e.split(""));
    });
    
    return parsed;
};

const initializeMapAndUnits = (gameMap, goblins, elves) => {
    let id = 1;
    
    for (let y = 0; y < gameMap.length; y++) {
        for (let x = 0; x < gameMap[y].length; x++) {
            let data = gameMap[y][x];
            let newUnit;
            
            if (data === "G") {
                newUnit = new Unit("goblin", id, x, y);                
                goblins.set(id, newUnit);                
            }            
            else if (data === "E") {
                newUnit = new Unit("elf", id, x, y);
                elves.set(id, newUnit);
            }
            else {
                continue;
            }
            
            gameMap[y][x] = newUnit;
            id++;
        }
    }
};

const playRound = (gameMap, goblins, elves) => {
    let turnOrder = getTurnOrder(goblins, elves);
    
    for (let i = 0; i < turnOrder.length; i++) {
        let currentUnit = goblins.get(turnOrder[i]) || elves.get(turnOrder[i]);
        let enemies;
        
        if (!currentUnit) {
            continue;
        }

        enemies = currentUnit.unitType === "goblin" ? elves : goblins;
        
        if (!enemies.size) {
            return false;
        }

        currentUnit.takeTurn(gameMap, enemies);       
    }
    
    return true;        
};

const getTurnOrder = (goblins, elves) => {
    let sorted = [];
    let merged = [...goblins.values(), ...elves.values()];
    
    merged.sort((a, b) => a.y - b.y || a.x - b.x)
    .forEach(e => sorted.push(e.id));
    
    return sorted;
};

const sumOfRemainingHitPoints = (goblins, elves) => {
    let sumOfHitPoints = 0;
    let winners;
    winners = goblins.size ? goblins : elves;
    
    for (let unit of winners.values()) {
        sumOfHitPoints += unit.getHitPoints();       
    }

    return sumOfHitPoints;
};

console.log(beverageOne(input));

module.exports = beverageOne;