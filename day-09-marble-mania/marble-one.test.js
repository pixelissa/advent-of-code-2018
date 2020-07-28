const marbleOne = require("./marble-one");

test(`returns 32 when input is
    9 players; last marble is worth 25 points`, () => {
    const input = 
    `9 players; last marble is worth 25 points`;
    expect(marbleOne(input)).toBe(32);
});

test(`returns 8317 when input is
    10 players; last marble is worth 1618 points`, () => {
    const input = 
    `10 players; last marble is worth 1618 points`;
    expect(marbleOne(input)).toBe(8317);
});

test(`returns 146373 when input is
    13 players; last marble is worth 7999 points`, () => {
    const input = 
    `13 players; last marble is worth 7999 points`;
    expect(marbleOne(input)).toBe(146373);
});

test(`returns 2764 when input is
    17 players; last marble is worth 1104 points`, () => {
    const input = 
    `17 players; last marble is worth 1104 points`;
    expect(marbleOne(input)).toBe(2764);
});

test(`returns 54718 when input is
    21 players; last marble is worth 6111 points`, () => {
    const input = 
    `21 players; last marble is worth 6111 points`;
    expect(marbleOne(input)).toBe(54718);
});

test(`returns 37305 when input is
    30 players; last marble is worth 5807 points`, () => {
    const input = 
    `30 players; last marble is worth 5807 points`;
    expect(marbleOne(input)).toBe(37305);
});
