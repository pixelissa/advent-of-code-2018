const polymerTwo = require("./polymer-two.js");

test("returns 4 when input is dabAcCaCBAcCcaDA", () => {
    const input = "dabAcCaCBAcCcaDA";
    expect(polymerTwo(input)).toBe(4);
});