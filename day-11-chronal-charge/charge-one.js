const chargeOne = (serialNumber) => {
    const GRID_SERIAL_NUMBER = serialNumber;
    let highest = {x: null, y: null, power: 0};

    for (let y = 1; y < 299; y++) {
        for (let x = 1; x < 299; x++) {
            let power = calculateSquarePower(x, y, GRID_SERIAL_NUMBER);

            if (power > highest.power) {
                highest = {x, y, power};
            }
        }
    }

    return highest;
};

const calculateSquarePower = (xCoor, yCoor, serialNumber) => {
    let squarePower = 0;
    let maxHeight = yCoor + 2;
    let maxWidth = xCoor + 2;

    for (let y = yCoor; y <= maxHeight; y++) {
        for (let x = xCoor; x <= maxWidth; x++) {            
            squarePower += calculateCellPower(x, y, serialNumber);
        }
    }

    return squarePower;
};

const calculateCellPower = (x, y, serialNumber) => {
    let rackId = x + 10;
    let cellPower = (rackId * y) + serialNumber;
    cellPower *= rackId;
    
    return Math.floor(cellPower % 1000 / 100) - 5;
};

console.log(chargeOne(2866));

module.exports = chargeOne;