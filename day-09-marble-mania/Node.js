const Node = class {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.previous = null;
    }
};

module.exports = Node;