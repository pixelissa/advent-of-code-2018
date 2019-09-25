const checksum = require("./checksum");

test("returns 12 as checksum", () => {
    const input = 
    `abcdef
    bababc
    abbcde
    abcccd
    aabcdd    
    abcdee
    ababab`;
    expect(checksum(input)).toBe(12);
});