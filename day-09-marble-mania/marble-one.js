const CircularDoublyLinkedList = require("./CircularDoublyLinkedList");
const input = require("fs").readFileSync("./input.txt").toString();

const marbleOne = (input) => {
    const [numOfPlayers, numOfMarbles] = parseInput(input);
    const scoreBoard = playMarbles(numOfPlayers, numOfMarbles);    
    return Math.max(...scoreBoard);
};

const parseInput = (input) => {
    const groups = input.match(/(\d+)/g);
    return [parseInt(groups[0]), parseInt(groups[1])];    
};

const playMarbles = (players, marbles) => {
    const scoreBoard = Array(players).fill(0);
    const marbleBoard = new CircularDoublyLinkedList();
    let nextMarble = 0;
    let player = 0;

    marbleBoard.insert(null, nextMarble);
    nextMarble++;

    let currentMarble = marbleBoard.head;

    while (nextMarble <= marbles) {
        if (nextMarble % 23 !== 0) {
            // insert marble 1 clockwise from current    
            marbleBoard.insert(currentMarble, nextMarble);
            currentMarble = currentMarble.next.next;
        }
        else {
            // remove marble 7 counter-clockwise from current
            scoreBoard[player] += nextMarble;
            let [removed, next] = marbleBoard.remove(currentMarble);
            scoreBoard[player] += removed;
            currentMarble = next;
        }

        player = (player + 1) % players;
        nextMarble++;
    }

    return scoreBoard;
};

console.log(marbleOne(input));

module.exports = marbleOne;