const calibrateDuplicates = require("./calibrate-two");

test("returns 2 when input is +1, -2, +3, +1, +1, -2", () => {
    const input = 
    `+1
    -2
    +3
    +1
    +1
    -2`;
    expect(calibrateDuplicates(input)).toBe(2);
});

test("returns 0 when input is +1, -1", () => {
    const input = 
    `+1
    -1`;
    expect(calibrateDuplicates(input)).toBe(0);
});

test("returns 10 when input is +3, +3, +4, -2, -4", () => {
    const input = 
    `+3
    +3
    +4
    -2
    -4`;
    expect(calibrateDuplicates(input)).toBe(10);
});

test("returns 5 when input is -6, +3, +8, +5, -6", () => {
    const input = 
    `-6
    +3
    +8
    +5
    -6`;
    expect(calibrateDuplicates(input)).toBe(5);
});

test("returns 14 when input is +7, +7, -2, -7, -4", () => {
    const input = 
    `+7
    +7
    -2
    -7
    -4`;
    expect(calibrateDuplicates(input)).toBe(14);
});