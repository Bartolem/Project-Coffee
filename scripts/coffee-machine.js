class CoffeeMachine {
    constructor(water, milk, coffee, cup) {
        let _water = water;
        let _milk = milk;
        let _coffee = coffee;
        let _cup = cup;
        let _defaultWater = 1750;
        let _defaultMilk = 2400;
        let _defaultCoffee = 500;
        let _defaultCup = 15;
        
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
         
        this.getDefaultWater = function() {
            return _defaultWater;
        }
        this.getDefaultMilk = function() {
            return _defaultMilk;
        }
        this.getDefaultCoffee = function() {
            return _defaultCoffee;
        }
        this.getDefaultCup = function() {
            return _defaultCup;
        }

        this.setWater = function(value) {
            _water = value;
        }
        this.setMilk = function(value) {
            _milk = value;
        }
        this.setCoffee = function(value) {
            _coffee = value;
        }
        this.setCup = function(value) {
            _cup = value;
        }
    }
}
