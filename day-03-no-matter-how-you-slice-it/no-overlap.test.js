const noOverlap = require('./no-overlap');

test("should return 3", () => {
    const input =
    `#1 @ 1,3: 4x4
    #2 @ 3,1: 4x4
    #3 @ 5,5: 2x2`;
    expect(noOverlap(input)).toBe(3);
});