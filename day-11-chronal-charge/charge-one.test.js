const chargeOne = require("./charge-one");

test(`returns [33, 45] when input is 18`, () => {
    const input = 18;
    expect(chargeOne(input)).toStrictEqual([33, 45]);
});

test(`returns [21, 61] when input is 42`, () => {
    const input = 42;
    expect(chargeOne(input)).toStrictEqual([21, 61]);
});