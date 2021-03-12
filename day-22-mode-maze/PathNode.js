const PathNode = class {
    constructor(x, y, tool, timeCost) {
        this.x = x;
        this.y = y;
        this.tool = tool;
        this.timeCost = timeCost;
    }

    getXYToolKey() {
        return `${this.x}|${this.y}|${this.tool}`;
    }
};

module.exports = PathNode;