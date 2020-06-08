const Tree = class {
    constructor(root) {
        this.root = root;        
    }

    traverseBF(fn) {
        let result = 0;
        const arr = [this.root];
        while (arr.length) {
            const node = arr.shift();
            arr.push(...node.children);
            result += fn(node);
        }
        
        return result;
    }
};

module.exports = Tree;