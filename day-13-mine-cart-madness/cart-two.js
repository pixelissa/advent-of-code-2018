const input = require("fs").readFileSync("./input.txt").toString();
const Cart = require("./Cart");

const cartTwo = (input) => {
    let parsedInput = parse(input);    
    let mineCartMap = [];
    let carts = [];
    let previousMovedCart = null;

    generateMapAndCarts(parsedInput, mineCartMap, carts);
    
    while (carts.length > 1) {
        for (let i = 0; i < carts.length; i++) {
            let cart = carts[i];       
            let prevX = cart.currentLocation.x;
            let prevY = cart.currentLocation.y;

            cart.move();

            let nextX = cart.currentLocation.x;
            let nextY = cart.currentLocation.y;                        

            if (mineCartMap[nextY][nextX].hasCart) {
                carts = carts.filter(cart => !(cart.currentLocation.x === nextX && cart.currentLocation.y === nextY));
                
                mineCartMap[prevY][prevX].hasCart = false;
                mineCartMap[nextY][nextX].hasCart = false;

                // adjust index
                if ((cart.currentLocation.x !== previousMovedCart.currentLocation.x) &&
                    (cart.currentLocation.y !== previousMovedCart.currentLocation.y)) {
                        i -= 1;
                }
                else {
                    i -= 2;
                }
            }
            else {
                mineCartMap[prevY][prevX].hasCart = false;
                mineCartMap[nextY][nextX].hasCart = true;

                let nextTrack = mineCartMap[nextY][nextX].track;

                if (nextTrack !== ("-" || "|")) {
                    processSpecialTrack(nextTrack, cart);
                }
            }
            
            previousMovedCart = cart;
        }

        carts.sort((a, b) => a.currentLocation.y - b.currentLocation.y || a.currentLocation.x - b.currentLocation.x);
    }
    
    return [carts[0].currentLocation.x, carts[0].currentLocation.y];
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

console.log(cartTwo(input));

