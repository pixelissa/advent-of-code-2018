const input = require("fs").readFileSync("./input.txt");
const treeBuilder = require("./license-tree-builder");

const licenseCheckTwo = (input) => {
    const parsedInput = input
        .toString()
        .split(" ")
        .map(Number);
        
    const tree = treeBuilder.buildTree(parsedInput);
    
    return getNodeValue(tree.root);
};

const getNodeValue = (node) => {
    let result = 0;

    if (node.data.hasChildren()) {
        for (let i = 0; i < node.data.metadata.length; i++) {
            if (node.data.metadata[i] <= 0 ||
                node.data.metadata[i] > node.data.header.numOfChildren) {
                continue;
            }
            else {
                result += getNodeValue(node.children[node.data.metadata[i] - 1]);
            }
        }
    }
    else {
        result += sumMetadata(node);
    }
    
    return result;
};

const sumMetadata = (node) => {
    return node.data.metadata.reduce((a, b) => a + b);
};

console.log(licenseCheckTwo(input));

module.exports = licenseCheckTwo;