const Cart = class {
    constructor(direction, location) {
        this.direction = direction;
        this.numOfTurns = 0;
        this.currentLocation = {
            x: location[0],
            y: location[1]
        };
    }

    move() {
        if (this.direction === "^") {                
            this.currentLocation.y--;
        }
        else if (this.direction === "v") {
            this.currentLocation.y++;
        }
        else if (this.direction === "<") {
            this.currentLocation.x--;
        }
        else if (this.direction === ">") {
            this.currentLocation.x++;
        }
    }

    turnRight() {
        switch (this.direction) {
            case "<":   this.direction = "^";
                        break;
            case ">":   this.direction = "v";
                        break;
            case "v":   this.direction = "<";
                        break;
            case "^":   this.direction = ">";
        }
    }

    turnLeft() {
        switch (this.direction) {
            case "<":   this.direction = "v";
                        break;
            case ">":   this.direction = "^";
                        break;
            case "v":   this.direction = ">";
                        break;
            case "^":   this.direction = "<";
        }
    }

    atIntersection() {
        this.numOfTurns++;

        if (this.numOfTurns === 1) {
            this.turnLeft();            
        }
        else if (this.numOfTurns === 3) {
            this.numOfTurns = 0;
            this.turnRight();            
        }
    }
};

module.exports = Cart;