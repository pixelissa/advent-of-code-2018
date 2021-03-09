const PathNode = class {
    constructor(x, y, parent) {
        this.x = x;
        this.y = y;
        this.parent = parent;
    }
};

module.exports = PathNode;