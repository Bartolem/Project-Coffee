export class CoffeeMachine {
    constructor(water, milk, coffee, cup) {
        this.water = water;
        this.milk = milk;
        this.coffee = coffee;
        this.cup = cup;
        this.defaultWater = 1750;
        this.defaultMilk = 2400;
        this.defaultCoffee = 500;
        this.defaultCup = 15;
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
    get cup() {
        return this._cup;
    }
     
    get defaultWater() {
        return this._defaultWater;
    }
    get defaultMilk() {
        return this._defaultMilk;
    }
    get defaultCoffee() {
        return this._defaultCoffee;
    }
    get defaultCup() {
        return this._defaultCup;
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
    set cup(value) {
        this._cup = value;
    }

    set defaultWater(value) {
        this._defaultWater = value;
    }
    set defaultMilk(value) {
        this._defaultMilk = value;
    }
    set defaultCoffee(value) {
        this._defaultCoffee = value;
    }
    set defaultCup(value) {
        this._defaultCup = value;
    }
}
