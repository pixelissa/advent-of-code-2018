// ******* SEE BELOW FOR NOTES *******

const input = require("fs").readFileSync("./input.txt").toString().split("\r\n");

const flowTwo = () => {
    // const boundRegister = parseInt(input[0].match(/#ip\s(\d{1})/)[1]);
    // const instructions = parseInstructions(input);
    // const opcodes = generateOpcodesMap();

    // const registers = [1, 0, 0, 0, 0, 0];
    // let instructionPointer = 0;

    // while (instructionPointer < instructions.length) {       
    //     registers[boundRegister] = instructionPointer;

    //     let instruction = instructions[instructionPointer];
    //     registers[instruction.outputC] = opcodes.get(instruction.opcodeName)(registers, instruction.inputA, instruction.inputB);

    //     console.log(instructionPointer + ": " + registers);

    //     instructionPointer = registers[boundRegister];
    //     instructionPointer++;
    // }

    return findAndSumFactors(10551410);
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

const findAndSumFactors = number => [...Array(number + 1).keys()]
    .filter(i=>number % i === 0)
    .reduce((acc, curr) => acc + curr);

console.log(flowTwo());

/***** NOTES *****
 
The goal is to find factors: r[3] * r[2] === r[1] (factors of 10551410 in my case)
And return the sum of these factors because they are added to r[0] every time we reach Instruction 7

0:  addi 5 16 5  # r[5] += 16
1:  seti 1 0 3   # r[3] = 1
2:  seti 1 2 2   # r[2] = 1
3:  mulr 3 2 4   # r[4] = r[3] * r[2]
4:  eqrr 4 1 4   # r[4] = r[4] === r[1] ? 1 : 0
5:  addr 4 5 5   # r[5] += r[4]
6:  addi 5 1 5   # r[5] += 1 (GOTO 8 skip 7)
7:  addr 3 0 0   # r[0] += r[3]
8:  addi 2 1 2   # r[2] += 1
9:  gtrr 2 1 4   # r[4] = r[2] > r[1] ? 1 : 0
10: addr 5 4 5   # r[5] += r[4]
11: seti 2 7 5   # r[5] = 2 (GOTO 3)
12: addi 3 1 3   # r[3] += 1
13: gtrr 3 1 4   # r[4] = r[3] > r[1] ? 1 : 0
14: addr 4 5 5   # r[5] += r[4]
15: seti 1 3 5   # r[5] = 1
16: mulr 5 5 5   # r[5] *= r[5]
See below for instructions 17-35

***** Instructions 3 to 8 *****
if (r[3] * r[2] === r[1]) {
    r[0] += r[3]
}
else {
    r[2] += 1
}

***** Instructions 9 to 12 *****
if (r[2] > r[1]) {
    r[3] += 1
}
else {
    goto 3
}

***** Instructions 13 to 16
if (r[3] > r[1]) {
    r[5] *= r[5]
}
else {
    r[2] = 1
}

17: addi 1 2 1
18: mulr 1 1 1
19: mulr 5 1 1
20: muli 1 11 1
21: addi 4 7 4
22: mulr 4 5 4
23: addi 4 20 4
24: addr 1 4 1
25: addr 5 0 5
26: seti 0 4 5
27: setr 5 9 4
28: mulr 4 5 4
29: addr 5 4 4
30: mulr 5 4 4
31: muli 4 14 4
32: mulr 4 5 4
33: addr 1 4 1
34: seti 0 2 0
35: seti 0 5 5
*/