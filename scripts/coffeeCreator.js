export class CoffeeCreator {
    static get customCoffeeButton() {
        const customCoffeeButton = document.querySelector('.custom-name button');
        return customCoffeeButton;
    }

    static get customCoffeeInput() {
        const customCoffeeInput = document.querySelector('.custom-name input');
        return customCoffeeInput;
    }
    
    static get addToCoffeeMachine() {
        const addToCoffeeMachine = document.getElementById('add-to-coffee-machine');
        return addToCoffeeMachine;
    }

    static get innerCoffee() {
        const innerCoffee = document.querySelector('.inner-coffee'); 
        return innerCoffee;
    }

    static get innerMilk() {
        const innerMilk = document.querySelector('.inner-milk');
        return innerMilk;
    }

    static get innerFoam() {
        const innerFoam = document.querySelector('.inner-foam');
        return innerFoam;
    }

    static get inner() {
        const inner = document.querySelector('.custom-coffee-inner'); 
        return inner;
    }

    static get coffeeRange() {
        const coffeeRange = document.getElementById('coffee-range');
        return coffeeRange;
    }

    static get milkRange() {
        const milkRange = document.getElementById('milk-range');
        return milkRange;
    }

    static get foamRange() {
        const foamRange = document.getElementById('foam-range');
        return foamRange;
    }

    static get fillRange() {
        const fillRange = document.getElementById('fill-range');
        return fillRange;
    }

    static get closeCoffeeCreatorIcon() {
        const closeCoffeeCreatorIcon = document.querySelector('.coffee-creation-top i');
        return closeCoffeeCreatorIcon;
    }

    static get coffeeCreation() {
        const coffeeCreation = document.querySelector('.coffee-creation');
        return coffeeCreation;
    }
    
    static get coffeeCreationWrap() {
        const coffeeCreationWrap = document.querySelector('.coffee-creation-wrap');
        return coffeeCreationWrap;
    }
}