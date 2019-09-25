const overlap = require('./overlap');

test("should return overlapping by 4 inches", () => {
    const input =
    `#1 @ 1,3: 4x4
    #2 @ 3,1: 4x4
    #3 @ 5,5: 2x2`;
    expect(overlap(input)).toBe(4);
});