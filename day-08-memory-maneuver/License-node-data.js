const LicenseNodeData = class {
    constructor(numOfChildren, numOfMetadataEntries) {
        this.header = {
            numOfChildren: numOfChildren,
            numOfMetadataEntries: numOfMetadataEntries
        };
        this.metadata = [];   
    }

    addMetadata(metadata) {
        this.metadata.push(metadata);
    }

    hasChildren() {
        return this.header.numOfChildren > 0;
    }
};

module.exports = LicenseNodeData;