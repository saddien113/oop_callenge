
class MesinHitung {
    constructor() {
        this.x = 1 ;
        this.pi = 22 / 7;
    }

    add(y) {
        this.x += y;
        return this;
    }
    subtract(y) {
        this.x -= y;
        return this;
    }
    multiply(y) {
        this.x *= y
        return this
    }
    divide(y) {
        this.x /= y
        return this
    }
    square(y) {
        this.x = Math.pow(y, 2)
        return this
    }
    exponent(y) {
        this.x = Math.pow(this.x, y)
        return this
    }
    squareRoot(y) {
        this.x = Math.sqrt(this.x);  
        return this
     }

    result() {
        console.log(this.x);
    }
}


export default MesinHitung