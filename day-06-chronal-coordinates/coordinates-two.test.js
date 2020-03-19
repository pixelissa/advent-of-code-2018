const coordinatesTwo = require("./coordinates-two");

test("returns 16 when input is 1,1 1,6 8,3 3,4 5,5 8,9", () => {
    const input =
    `1, 1
    1, 6
    8, 3
    3, 4
    5, 5
    8, 9`;
    expect(coordinatesTwo(input, 32)).toBe(16);
});