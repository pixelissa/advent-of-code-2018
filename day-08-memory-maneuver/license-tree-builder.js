const Node = require("./Node");
const LicenseNodeData = require("./License-node-data");
const Tree = require("./Tree");

exports.buildTree = (input) => {
    const licenseNodeData = new LicenseNodeData(input.shift(), input.shift());
    const node = new Node(licenseNodeData);
    
    while (input.length) {
        if (licenseNodeData.hasChildren()) {
            processChildren(node, input);
        }
    
        processMetadata(node, input);       
    }

    return new Tree(node);
};

const processChildren = (node, input) => {
    for (let i = 0; i < node.data.header.numOfChildren; i++) {        
        const licenseNodeData = new LicenseNodeData(input.shift(), input.shift());
        const childNode = new Node(licenseNodeData);

        node.addChild(childNode);

        if (licenseNodeData.hasChildren()) {
            processChildren(childNode, input);
        }

        processMetadata(childNode, input);        
    }
};

const processMetadata = (node, input) => {
    for (let i = 0; i < node.data.header.numOfMetadataEntries; i++) {
        node.data.addMetadata(input.shift());
    }
};