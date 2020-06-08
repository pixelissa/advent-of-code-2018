const Node = class {
    constructor(name) {
        this.name = name;
        this.edges = [];
    }

    addEdge(edge) {
        this.edges.push(edge);
    }

    removeEdge(edge) {
        if (this.edges.includes(edge)) {
            this.edges = this.edges.filter(e => e !== edge);
        }
    }
};

module.exports = Node;