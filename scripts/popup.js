export class Popup {
    static get modal() {
        const modal = document.querySelector('.modal');
        return modal;
    }

    static get modalWrap() {
        const modalWrap = document.querySelector('.modal-wrap');
        return modalWrap;
    }

    static get alert() {
        const alert = document.querySelector('.alert');
        return alert;
    }

    static get alertText() {
        const alertText = document.querySelector('.alert span');
        return alertText;
    }

    static get closeModalIcon() {
        const closeModalIcon =  document.querySelector('.modal-top i');
        return closeModalIcon;
    }

    static get addCoffeeIcon() {
        const addCoffeeIcon = document.querySelector('#add-coffee');
        return addCoffeeIcon;
    }

    static get addMilkIcon() {
        const addMilkIcon = document.querySelector('#add-milk');
        return addMilkIcon;
    }

    static get addWaterIcon() {
        const addWaterIcon = document.querySelector('#add-water');
        return addWaterIcon;
    }

    static get defaultCoffeeQuantity() {
        const defaultCoffeeQuantity = document.querySelector('.default-coffee-quantity');
        return defaultCoffeeQuantity;
    }

    static get defaultMilkQuantity() {
        const defaultMilkQuantity = document.querySelector('.default-milk-quantity');
        return defaultMilkQuantity;
    }

    static get defaultWaterQuantity() {
        const defaultWaterQuantity = document.querySelector('.default-water-quantity');
        return defaultWaterQuantity;
    }
    
    static get coffeeQuantity() {
        const coffeeQuantity = document.querySelector('.coffee-quantity');
        return coffeeQuantity;
    }

    static get milkQuantity() {
        const milkQuantity = document.querySelector('.milk-quantity');
        return milkQuantity;
    }

    static get waterQuantity() {
        const waterQuantity = document.querySelector('.water-quantity');
        return waterQuantity;
    }
}

