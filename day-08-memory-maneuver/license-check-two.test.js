const licenseCheckTwo = require("./license-check-two");

test(`returns 66 when input is
    2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`, () => {
    const input =
    `2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`;
    expect(licenseCheckTwo(input)).toBe(66);
});