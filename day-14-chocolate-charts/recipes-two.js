const recipesTwo = (input) => {
    const sequence = input;
    const sequenceLength = sequence.length;
    let testSequence = "";
    let index = 0;
    const scoreboard = [];
    const firstElf = {
        currentRecipe: 3,
        index: 0
    };
    const secondElf = {
        currentRecipe: 7,
        index: 1
    };

    scoreboard.push(firstElf.currentRecipe, secondElf.currentRecipe);

    while (testSequence !== sequence) {
        let newRecipes = (firstElf.currentRecipe + secondElf.currentRecipe).toString().split("");

        newRecipes.forEach(recipe => {
            scoreboard.push(parseInt(recipe));
        });

        assignNewRecipe(firstElf, scoreboard);
        assignNewRecipe(secondElf, scoreboard);

        testSequence = scoreboard.slice(index, index + sequenceLength).join("");
        index++;
    }

    return index - 1;
};

const assignNewRecipe = (elf, scoreboard) => {
    let numOfMoves = 1 + elf.currentRecipe;
    let newIndex = (elf.index + numOfMoves) % scoreboard.length;

    elf.index = newIndex;
    elf.currentRecipe = scoreboard[newIndex];
};

console.log(recipesTwo("430971"));
