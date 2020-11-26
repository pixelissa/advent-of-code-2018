const fs = require("fs");
const samplesInput = fs.readFileSync("./input-one.txt").toString().split("\r\n\r\n");
const sampleProgramInput = fs.readFileSync("./input-two.txt").toString().split("\r\n");

const chronalTwo = () => {
    const samples = parseSamples(samplesInput);
    const sampleProgram = parseSampleProgramInput(sampleProgramInput);
    const OPCODES = generateOpcodesMap();
    let opcodeIds = generateOpcodeIdsMap(OPCODES, samples);
    let solvedOpcodeIds = solveOpcodeIds(opcodeIds);
    const registers = [0, 0, 0, 0];

    runSampleProgram(sampleProgram, OPCODES, solvedOpcodeIds, registers);

    return registers[0];
};

const parseSamples = (input) => {
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

const parseSampleProgramInput = (input) => {
    const result = [];
    
    input.forEach(line => {
        let newLine = [];

        line.split(" ").forEach(e => {
            newLine.push(parseInt(e));
        });

        result.push(newLine);
    });
    
    return result;
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

const generateOpcodeIdsMap = (opcodes, samples) => {
    const opcodeIds = new Map();

    for (let key of opcodes.keys()) {
        opcodeIds.set(key, [...Array(16).keys()]);
    }

    samples.forEach(s => {
        let opcodeNum = s.instructions[0];
        let inputA = s.instructions[1];
        let inputB = s.instructions[2];
        let outputC = s.instructions[3];

        for (let [key, value] of opcodes.entries()) {
            let result = value(s.registersBefore, inputA, inputB);

            if (result !== s.registersAfter[outputC]) {
                let index = opcodeIds.get(key).indexOf(opcodeNum);

                if (index >= 0) {
                    opcodeIds.get(key).splice(index, 1);
                }                
            }
        }        
    });

    return opcodeIds;
};

const solveOpcodeIds = (opcodeIds) => {
    let result = new Map();

    while (opcodeIds.size) {
        for (let [key, value] of opcodeIds.entries()) {
            if (value.length === 1) {
                result.set(...value, key);
                opcodeIds.delete(key);
                removeSolvedOpcode(opcodeIds, ...value);              
            }
        }
    }

    return result;
};

const removeSolvedOpcode = (opcodes, solvedOpcode) => {
    for (let value of opcodes.values()) {        
        let index = value.indexOf(solvedOpcode);

        if (index >= 0) {
            value.splice(index, 1);
        }
    }
};

const runSampleProgram = (program, opcodes, ids, registers) => {
    program.forEach(line => {
        let opcodeId = line[0];
        let inputA = line[1];
        let inputB = line[2];
        let outputC = line[3];

        let formula = opcodes.get(ids.get(opcodeId));
        registers[outputC] = formula(registers, inputA, inputB);    
    });
};

console.log(chronalTwo());