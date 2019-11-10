const reactPolymer = (polymer) => {
    let firstUnitPosition = 0;

    while (true) {

        let reactable = checkIfReactable(polymer[firstUnitPosition], polymer[firstUnitPosition + 1]);

        if (reactable) {
            polymer.splice(firstUnitPosition, 2);
            if (firstUnitPosition > 0) {
                firstUnitPosition--;
            }
        } else {
            firstUnitPosition++;
        }

        if (firstUnitPosition + 1 >= polymer.length) {
            break;
        }
    }

    return polymer;
};

const checkIfReactable = (unit1, unit2) => {
    return unit1.toLowerCase() === unit2.toLowerCase()
        && unit1 !== unit2;
};

module.exports = reactPolymer;
