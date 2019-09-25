const checksumTwo = require("./checksum-two");

test("returns fgij as common letters", () => {
    const input = 
    `abcde\nfghij\nklmno\npqrst\nfguij\naxcye\nwvxyz`;
    expect(checksumTwo(input)).toBe("fgij");
});