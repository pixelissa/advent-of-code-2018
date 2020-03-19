const coordinatesOne = require("./coordinates-one");

test("returns 17 when input is 1,1 1,6 8,3 3,4 5,5 8,9", () => {
    const input =
    `1, 1
    1, 6
    8, 3
    3, 4
    5, 5
    8, 9`;
    expect(coordinatesOne(input)).toBe(17);
});