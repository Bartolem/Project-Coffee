export class CoffeeMenu {
    static get coffeeMenu() {
        const coffeeMenu = document.querySelector('.right-child');
        return coffeeMenu;
    }

    static get closeCoffeeMenu() {
        const closeCoffeeMenu = document.querySelector('.menu-top i');
        return closeCoffeeMenu;
    }
}