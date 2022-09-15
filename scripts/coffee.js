class Coffee {
    constructor(name, water, milk, coffee) {
        this.name = name;
        let _water = water;
        let _milk = milk;
        let _coffee = coffee;
        let _cup = 1;

        this.getWater = function() {
            return _water;
        }
        this.getMilk = function() {
            return _milk;
        }
        this.getCoffee = function() {
            return _coffee;
        }
        this.getCup = function() {
            return _cup;
        }
    }

    showCoffeeName() {
        console.log(`This is ${this.name}`)
    }
}
