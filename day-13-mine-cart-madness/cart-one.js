const input = require("fs").readFileSync("./input.txt").toString();
const Cart = require("./Cart");

const cartOne = (input) => {
    let parsedInput = parse(input);  
    let mineCartMap = [];
    let carts = [];
    let crash = false;
    let result = null;

    generateMapAndCarts(parsedInput, mineCartMap, carts);

    while (!crash) {        
        for (let i = 0; i < carts.length; i++) {
            let cart = carts[i];
            let prevX = cart.currentLocation.x;
            let prevY = cart.currentLocation.y;

            cart.move();

            let nextX = cart.currentLocation.x;
            let nextY = cart.currentLocation.y;                        

            if (mineCartMap[nextY][nextX].hasCart) {
                crash = true;
                result = [nextX, nextY];
                break;
            }
            else {
                mineCartMap[prevY][prevX].hasCart = false;
                mineCartMap[nextY][nextX].hasCart = true;

                let nextTrack = mineCartMap[nextY][nextX].track;

                if (nextTrack !== ("-" || "|")) {
                    processSpecialTrack(nextTrack, cart);
                }
            }                       
        }    
        
        carts.sort((a, b) => a.currentLocation.y - b.currentLocation.y || a.currentLocation.x - b.currentLocation.x);
    }
    
    return result;
};

const parse = (input) => {
    let parsed = [];
            
    input.split("\n").forEach(e => {
        parsed.push(e.split(""));
    });
        
    return parsed;
};

const generateMapAndCarts = (input, map, carts) => {
    let max = input.length;

    for (let y = 0; y < max; y++) {
        let row = [];

        for (let x = 0; x < input[y].length; x++) {
            let coor = [x, y];
            let track = input[y][x];

            if (track === "^" || track === "v") {
                carts.push(new Cart(track, coor));
                row.push({track: "|", hasCart: true});
            }
            else if (track === "<" || track === ">") {
                carts.push(new Cart(track, coor));
                row.push({track: "-", hasCart: true});                 
            }
            else {
                row.push({track: track, hasCart: false});
            }
        }

        map.push(row);
    }
};

const processSpecialTrack = (track, cart) => {
    switch (track) {
        case "+":   cart.atIntersection();
                    break;
        
        case "/":   cart.direction === "^" || cart.direction === "v" ? cart.turnRight() : cart.turnLeft();
                    break;

        case "\\":  cart.direction === "^" || cart.direction === "v" ? cart.turnLeft() : cart.turnRight();
                    break;

        default:    break;
    }
};

console.log(cartOne(input));