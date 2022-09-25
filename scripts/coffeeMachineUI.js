export class CoffeeMachineUI {
    static get milk() {
        const milk = document.querySelector('.milk');
        return milk;
    }
    
    static get coffee() {
        const coffee = document.querySelector('.coffee');
        return coffee;
    }

    static get startButton() {
        const startButton = document.querySelector('.start');
        return startButton;
    }

    static get powerButton() {
        const powerButton = document.querySelector('.power');
        return powerButton;
    }

    static get smallPowerBtn() {
        const smallPowerBtn = document.querySelector('.small-btn-power');
        return smallPowerBtn;
    }

    static get smallStartBtn() {
        const smallStartBtn = document.querySelector('.small-btn-start');
        return smallStartBtn;
    }

    static get espressoButton() {
        const espressoButton = document.querySelector('.espresso-btn');
        return espressoButton;
    }

    static get latteButton() {
        const latteButton = document.querySelector('.latte-btn');
        return latteButton;
    }

    static get americanoButton() {
        const americanoButton = document.querySelector('.americano-btn');
        return americanoButton;
    }

    static get cappuccinoButton() {
        const cappuccinoButton = document.querySelector('.cappuccino-btn');
        return cappuccinoButton;
    }

    static get text() {
        const text = document.querySelector('#output-text');
        return text;
    }

    static get takeCoffee() {
        const takeCoffee = document.querySelector('.base button:nth-child(1)');
        return takeCoffee;
    }

    static get takeCup() {
        const takeCup = document.querySelector('.base button:nth-child(2)');
        return takeCup;
    }

    static get cup() {
        const cup = document.querySelector('.cup');
        return cup;
    }

    static get innerCup() {
        const innerCup = document.querySelector('.inner-cup');
        return innerCup;
    }

    static get aside() {
        const aside = document.querySelector('.action-icons');
        return aside;
    }

    static get showAside() {
        const showAside = document.getElementById('menu-bars');
        return showAside;
    }
}