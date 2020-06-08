const input = require("fs").readFileSync("./input.txt");
const treeBuilder = require("./license-tree-builder");

const licenseCheckOne = (input) => {
    const parsedInput = input
        .toString()
        .split(" ")
        .map(Number);

    return treeBuilder.buildTree(parsedInput).traverseBF(sumMetadata);
};

const sumMetadata = (node) => {
    return node.data.metadata.reduce((a, b) => a + b);
};

console.log(licenseCheckOne(input));

module.exports = licenseCheckOne;