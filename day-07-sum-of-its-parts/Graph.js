const Graph = class {
    constructor(nodes) {
        this.allNodes = nodes;
    }

    getAvailableSteps() {
        return this.allNodes.filter(n => n.edges <= 0).map(n => n.name);
    }

    removeEdgelessNodes() {
        this.allNodes = this.allNodes.filter(n => n.edges.length > 0);
    }

    removeEdgeFromNodes(edge) {
        this.allNodes.forEach(n => {
            n.removeEdge(edge);
        });
    }

    hasNodes() {
        return this.allNodes.length > 0;
    }
};

module.exports = Graph;