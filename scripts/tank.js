export class Tank {
    static get coffee() {
        const coffee = document.querySelector('.coffee-in-tank');;
        return coffee;
    }

    static get milk() {
        const milk = document.querySelector('.milk-in-tank');;
        return milk;
    }

    static get water() {
        const water = document.querySelector('.water-in-tank');
        return water;
    }
    
    static get displayPercentCoffee() {
        const displayPercentCoffee = document.querySelector('.coffee-percent');
        return displayPercentCoffee;
    }

    static get displayPercentMilk() {
        const displayPercentMilk = document.querySelector('.milk-percent');
        return displayPercentMilk;
    }

    static get displayPercentWater() {
        const displayPercentWater = document.querySelector('.water-percent');
        return displayPercentWater;
    }
}