const input = require("fs").readFileSync("./input-one.txt").toString().split("\r\n\r\n");

const chronalOne = (input) => {
    let matched = 0;
    const samples = parse(input);
    const OPCODES = generateOpcodesMap();
    
    samples.forEach(s => {
        let opcodesMatched = 0;

        let a = s.instructions[1];
        let b = s.instructions[2];
        let c = s.instructions[3];

        for (let value of OPCODES.values()) {
            let result = value(s, a, b);

            if (result === s.registersAfter[c]) {
                opcodesMatched++;
            }
        }

        if (opcodesMatched >= 3) {
            matched++;
        }
    });

    return matched;
};

const parse = (input) => {
    const regex = /Before:\s\[(\d,\s\d,\s\d,\s\d)\]\r\n(\d+\s\d\s\d\s\d)\r\nAfter:\s\s\[(\d,\s\d,\s\d,\s\d)\]/;
    const parsed = [];

    input.forEach(line => {
        parsed.push({
            "registersBefore": line.match(regex)[1].split(", ").map(e => parseInt(e, 10)),
            "instructions": line.match(regex)[2].split(" ").map(e => parseInt(e, 10)),
            "registersAfter": line.match(regex)[3].split(", ").map(e => parseInt(e, 10))
        });
    });
    
    return parsed;
};

const generateOpcodesMap = () => {
    const map = new Map();

    map.set("addr", (s, a, b) => {return s.registersBefore[a] + s.registersBefore[b]});
    map.set("addi", (s, a, b) => {return s.registersBefore[a] + b});
    map.set("mulr", (s, a, b) => {return s.registersBefore[a] * s.registersBefore[b]});
    map.set("muli", (s, a, b) => {return s.registersBefore[a] * b});
    map.set("banr", (s, a, b) => {return s.registersBefore[a] & s.registersBefore[b]});
    map.set("bani", (s, a, b) => {return s.registersBefore[a] & b});
    map.set("borr", (s, a, b) => {return s.registersBefore[a] | s.registersBefore[b]});
    map.set("bori", (s, a, b) => {return s.registersBefore[a] | b});
    map.set("setr", (s, a, b) => {return s.registersBefore[a]});
    map.set("seti", (s, a, b) => {return a});
    map.set("gtir", (s, a, b) => {return a > s.registersBefore[b] ? 1 : 0});
    map.set("gtri", (s, a, b) => {return s.registersBefore[a] > b ? 1 : 0});
    map.set("gtrr", (s, a, b) => {return s.registersBefore[a] > s.registersBefore[b] ? 1 : 0});
    map.set("eqir", (s, a, b) => {return a === s.registersBefore[b] ? 1 : 0});
    map.set("eqri", (s, a, b) => {return s.registersBefore[a] === b ? 1 : 0});
    map.set("eqrr", (s, a, b) => {return s.registersBefore[a] === s.registersBefore[b] ? 1 : 0});
    
    return map;
};

console.log(chronalOne(input));