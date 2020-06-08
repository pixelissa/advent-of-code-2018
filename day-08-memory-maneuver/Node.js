const Node = class {
    constructor(data) {
        this.data = data;
        this.children = [];
    }

    addChild(child) {
        this.children.push(child);
    }
};

module.exports = Node;