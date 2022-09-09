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

const espresso = new Coffee('espresso', 30, 0, 8);
const latte = new Coffee('latte', 60, 300, 16);
const americano = new Coffee('americano', 150, 0, 16);
const cappuccino = new Coffee('cappuccino', 60, 120, 16);