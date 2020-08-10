const chargeTwo = (serialNumber) => {
    const GRID_SERIAL_NUMBER = serialNumber;
    const GRID_SIZE = 300;
    const grid = createGrid(GRID_SIZE, GRID_SERIAL_NUMBER);

    let highest = {x: null, y: null, size: null, power: 0};

    for (let size = 1; size <= GRID_SIZE; size++) {
        for (let y = 1; y <= GRID_SIZE; y++) {
            if (y + size <= GRID_SIZE) {
                for (let x = 1; x <= GRID_SIZE; x++) {
                    if (x + size <= GRID_SIZE) {
                        let power = calculateSquarePower(x, y, size, grid);        
                    
                        if (power > highest.power) {
                            highest = {x, y, size, power};
                        } 
                    }   
                }
            }
        }
        console.log(`Completed size: ${size}`);
    }
    
    return highest;
};

const createGrid = (size, serialNumber) => {
    let grid = [];

    for (let y = 1; y <= size; y++) {
        grid.push([]);

        for (let x = 1; x <= size; x++) {
            grid[y-1][x-1] = calculateCellPower(x, y, serialNumber);
        }
    }

    return grid;
};

const calculateCellPower = (x, y, serialNumber) => {
    let rackId = x + 10;
    let cellPower = (rackId * y) + serialNumber;
    cellPower *= rackId;
    
    return Math.floor(cellPower % 1000 / 100) - 5;
};

const calculateSquarePower = (xCoor, yCoor, size, grid) => {
    let squarePower = 0;
    let maxHeight = yCoor + size;
    let maxWidth = xCoor + size;
    
    for (let y = yCoor; y < maxHeight; y++) {
        for (let x = xCoor; x < maxWidth; x++) {
            squarePower += grid[y-1][x-1];
        }
    }

    return squarePower;
};

console.log(chargeTwo(2866));

module.exports = chargeTwo;