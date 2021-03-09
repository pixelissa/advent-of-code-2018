const PathNode = require("./PathNode");

// direction vectors top, left, right, bottom
const Y_VECTORS = [-1, 0, 0, 1];
const X_VECTORS = [0, -1, 1, 0];

const Unit = class {
    constructor(unitType, id, x, y, attackPower = 3) {
        this.unitType = unitType;
        this.id = id;
        this.x = x;
        this.y = y;
        this.attackPower = attackPower;
        this.hitPoints = 200;
    }

    getHitPoints() {
        return this.hitPoints;
    }

    takeTurn(map, enemies) {
        this.move(this.pathfind(map), map);
        this.attack(map, enemies);        
    }

    pathfind(map) {
        const startNode = new PathNode(this.x, this.y, null);
        const queue = [];
        const visited = [];

        for (let y = 0; y < map.length; y++) {
            let row = [];
            
            for (let x = 0; x < map[y].length; x++) {
                row.push(false);
            }

            visited.push(row);
        }

        // bfs
        queue.push(startNode);
        visited[startNode.y][startNode.x] = true;

        while (queue.length) {
            let parentPathNode = queue.shift();

            // stop if enemy found
            if (map[parentPathNode.y][parentPathNode.x] !== "." && map[parentPathNode.y][parentPathNode.x] !== "#") {
                if (map[parentPathNode.y][parentPathNode.x].unitType !== this.unitType) {
                    let path = [parentPathNode];

                    while (path[path.length - 1].parent) {
                        path.push(path[path.length - 1].parent);
                    }
                    
                    return path.reverse();
                }
            }            
            
            // explore adjacent
            for (let i = 0; i < 4; i++) {
                let x = parentPathNode.x + X_VECTORS[i];
                let y = parentPathNode.y + Y_VECTORS[i];
                let adjacentNode = new PathNode(x, y, parentPathNode);

                // skip visited
                if (visited[adjacentNode.y][adjacentNode.x]) {
                    continue;
                }

                // skip blocked by wall #
                if (map[adjacentNode.y][adjacentNode.x] === "#") {
                    continue;
                }

                // skip blocked by friendly unit
                if (map[adjacentNode.y][adjacentNode.x] !== "." && map[adjacentNode.y][adjacentNode.x].unitType === this.unitType) {
                    continue;
                }
                
                // enemy or open spot . --> add to Q
                queue.push(adjacentNode);
                visited[adjacentNode.y][adjacentNode.x] = true;
            }
        }

        return null;
    }

    move(path, map) {
        if (path && path.length > 2) {
            map[this.y][this.x] = ".";
            this.x = path[1].x;
            this.y = path[1].y;
            map[this.y][this.x] = this;
        }
    }

    attack(map, enemies) {
        let enemiesInRange = [];

        // check 4 adjacent spots for enemies
        for (let i = 0; i < 4; i++) {
            let x = this.x + X_VECTORS[i];
            let y = this.y + Y_VECTORS[i];
            
            if (map[y][x] !== "." && map[y][x] !== "#") {
                if (map[y][x].unitType !== this.unitType) {
                    enemiesInRange.push(map[y][x]);
                }
            }
        }

        if (enemiesInRange.length) {
            let target;

            if (enemiesInRange.length > 1) {
                enemiesInRange.sort((a, b) => a.hitPoints - b.hitPoints);
            }

            target = enemiesInRange[0];
            target.hitPoints -= this.attackPower;

            if (target.hitPoints <= 0) {
                map[target.y][target.x] = ".";
                enemies.delete(target.id);
            }
        }
    }    
};

module.exports = Unit;