const Point = class {
    constructor(x, y, z, t) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.t = t;
        this.connectingPoints = [];
        this.constellation = null;
    }

    calculateManhattanDistanceTo(point) {
        let xDiff = Math.abs(this.x - point.x);
        let yDiff = Math.abs(this.y - point.y);
        let zDiff = Math.abs(this.z - point.z);
        let tDiff = Math.abs(this.t - point.t);

        return xDiff + yDiff + zDiff + tDiff;
    }

};

module.exports = Point;