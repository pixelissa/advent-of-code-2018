const input = require("fs").readFileSync("./input.txt").toString().split("\r\n");

const flowOne = () => {
    const boundRegister = parseInt(input[0].match(/#ip\s(\d{1})/)[1]);
    const instructions = parseInstructions(input);
    const opcodes = generateOpcodesMap();

    const registers = [0, 0, 0, 0, 0, 0];
    let instructionPointer = 0;

    while (instructionPointer < instructions.length) {
            registers[boundRegister] = instructionPointer;

            let instruction = instructions[instructionPointer];
            registers[instruction.outputC] = opcodes.get(instruction.opcodeName)(registers, instruction.inputA, instruction.inputB);

            instructionPointer = registers[boundRegister];
            instructionPointer++;
    }

    return registers;
};

const parseInstructions = (input) => {
    const regex = /([a-z]{4})\s(\d)\s(\d+)\s(\d)/;
    const parsed = [];

    input.slice(1).forEach(line => {
        parsed.push({
            "opcodeName": line.match(regex)[1],
            "inputA": parseInt(line.match(regex)[2]),
            "inputB": parseInt(line.match(regex)[3]),
            "outputC": parseInt(line.match(regex)[4])
        });
    });
    
    return parsed;
};

const generateOpcodesMap = () => {
    const map = new Map();

    map.set("addr", (registers, a, b) => {return registers[a] + registers[b]});
    map.set("addi", (registers, a, b) => {return registers[a] + b});
    map.set("mulr", (registers, a, b) => {return registers[a] * registers[b]});
    map.set("muli", (registers, a, b) => {return registers[a] * b});
    map.set("banr", (registers, a, b) => {return registers[a] & registers[b]});
    map.set("bani", (registers, a, b) => {return registers[a] & b});
    map.set("borr", (registers, a, b) => {return registers[a] | registers[b]});
    map.set("bori", (registers, a, b) => {return registers[a] | b});
    map.set("setr", (registers, a, b) => {return registers[a]});
    map.set("seti", (registers, a, b) => {return a});
    map.set("gtir", (registers, a, b) => {return a > registers[b] ? 1 : 0});
    map.set("gtri", (registers, a, b) => {return registers[a] > b ? 1 : 0});
    map.set("gtrr", (registers, a, b) => {return registers[a] > registers[b] ? 1 : 0});
    map.set("eqir", (registers, a, b) => {return a === registers[b] ? 1 : 0});
    map.set("eqri", (registers, a, b) => {return registers[a] === b ? 1 : 0});
    map.set("eqrr", (registers, a, b) => {return registers[a] === registers[b] ? 1 : 0});
    
    return map;
};

console.log(flowOne());