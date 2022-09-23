export class Coffee {
    constructor(name, water, milk, coffee) {
        this.name = name;
        this.water = water;
        this.milk = milk;
        this.coffee = coffee;
        this.cup = 1;
    }

    get water() {
        return this._water;
    }
    get milk() {
        return this._milk;
    }
    get coffee() {
        return this._coffee;
    }
    getCup() {
        return this.cup;
    }
    
    set water(value) {
        this._water = value;
    }
    set milk(value) {
        this._milk = value;
    }
    set coffee(value) {
        this._coffee = value;
    }

    showCoffeeName() {
        console.log(`This is ${this.name}`)
    }
}
