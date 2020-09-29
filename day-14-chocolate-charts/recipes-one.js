const recipesOne = (input) => {
    const recipeThreshold = input + 10;
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

    while (scoreboard.length <= recipeThreshold) {
        let newRecipes = (firstElf.currentRecipe + secondElf.currentRecipe).toString().split("");

        newRecipes.forEach(recipe => {
            scoreboard.push(parseInt(recipe));
        });

        assignNewRecipe(firstElf, scoreboard);
        assignNewRecipe(secondElf, scoreboard);
    }

    return scoreboard.slice(-11, scoreboard.length-1).join("");
};

const assignNewRecipe = (elf, scoreboard) => {
    let numOfMoves = 1 + elf.currentRecipe;
    let newIndex = (elf.index + numOfMoves) % scoreboard.length;

    elf.index = newIndex;
    elf.currentRecipe = scoreboard[newIndex];
};

console.log(recipesOne(430971));
