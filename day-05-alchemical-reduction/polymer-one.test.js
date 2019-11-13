const polymerOne = require("./polymer-one.js");

test("returns 10 when input is dabAcCaCBAcCcaDA", () => {
    const input = "dabAcCaCBAcCcaDA";
    expect(polymerOne(input)).toBe(10);
});