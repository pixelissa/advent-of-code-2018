const Node = require("./Node");

exports.parseInput = (input) => {
    let nodes = [];
    
    input.toString()
        .split("\n")
        .forEach(i => {
            let groups = i.match(/\w+ (.) \w+ \w+ \w+ \w+ \w+ (.)/);

            if (!nodes.find(n => n.name === groups[1])) {
                nodes.push(new Node(groups[1]));
            }

            if (!nodes.find(n => n.name === groups[2])) {
                nodes.push(new Node(groups[2]));
            }

            nodes.find(n => n.name === groups[2]).addEdge(groups[1]);
    });

    return nodes;
};

exports.popNextStep = (available) => {
    let shortest = available[0];
    let index = 0;
    let next;

    for (let s = 1; s < available.length; s++) {
        next = available[s];
        if (next < shortest) {
            index = s;
            shortest = next;
        }
    }

    available.splice(index, 1);

    return shortest;
};