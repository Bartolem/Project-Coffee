import { Popup } from "./popup.js";
import { CoffeeMachine } from "./coffee-machine.js"
import { Coffee } from "./coffee.js";
import { Cup } from "./cup.js";
import { Tank } from "./tank.js";
import { Storage } from "./storage.js";

const popup = new Popup();
const coffeeMachine = new CoffeeMachine(1750, 2400, 500, 15);
const espresso = new Coffee('espresso', 30, 0, 8);
const latte = new Coffee('latte', 60, 300, 16);
const americano = new Coffee('americano', 150, 0, 16);
const cappuccino = new Coffee('cappuccino', 60, 120, 16);
const customCoffee = new Coffee('', 60, 100, 16);

const customCoffeeButton = document.querySelector('.custom-name button');
const customCoffeeInput = document.querySelector('.custom-name input');
const addToCoffeeMachine = document.getElementById('add-to-coffee-machine');

const milk = document.querySelector('.milk');
const coffee = document.querySelector('.coffee');
const startButton = document.querySelector('.start');
const powerButton = document.querySelector('.power');
const smallPowerBtn = document.querySelector('.small-btn-power');
const smallStartBtn = document.querySelector('.small-btn-start');
const espressoButton = document.querySelector('.espresso-btn');
const latteButton = document.querySelector('.latte-btn');
const americanoButton = document.querySelector('.americano-btn');
const cappuccinoButton = document.querySelector('.cappuccino-btn');
const text = document.querySelector('#output-text');
const cup = document.querySelector('.cup');
const innerCup = document.querySelector('.inner-cup');
const takeCoffee = document.querySelector('.base button:nth-child(1)');
const takeCup = document.querySelector('.base button:nth-child(2)');
const displayPercentWater = document.querySelector('.water-percent');
const displayPercentMilk = document.querySelector('.milk-percent');
const displayPercentCoffee = document.querySelector('.coffee-percent');
const defaultWaterQuantity = document.querySelector('.default-water-quantity');
const waterQuantity = document.querySelector('.water-quantity');
const defaultMilkQuantity = document.querySelector('.default-milk-quantity');
const milkQuantity = document.querySelector('.milk-quantity');
const defaultCoffeeQuantity = document.querySelector('.default-coffee-quantity');
const coffeeQuantity = document.querySelector('.coffee-quantity');
const closeCoffeeCreatorIcon = document.querySelector('.coffee-creation-top i');
const closeCoffeeMenu = document.querySelector('.menu-top i');
const coffeeCreation = document.querySelector('.coffee-creation');
const coffeeCreationWrap = document.querySelector('.coffee-creation-wrap');
const aside = document.querySelector('.action-icons');
const showMenu = document.querySelector('.action-icons div:first-child');
const refillTanks = document.querySelector('.action-icons div:nth-child(2)');
const mugIcon = document.querySelector('.action-icons div:nth-child(3)');
const showAside = document.getElementById('menu-bars');
const coffeeMenu = document.querySelector('.right-child');
const innerCoffee = document.querySelector('.inner-coffee'); 
const innerMilk = document.querySelector('.inner-milk');
const innerFoam = document.querySelector('.inner-foam');
const inner = document.querySelector('.custom-coffee-inner'); 
const coffeeRange = document.getElementById('coffee-range');
const milkRange = document.getElementById('milk-range');
const foamRange = document.getElementById('foam-range');
const fillRange = document.getElementById('fill-range');

let power = false;

const cupElements = [Cup.coffee, Cup.milk, Cup.foam];
const coffeeButtons = [espressoButton, latteButton, americanoButton, cappuccinoButton];
const activeElements = [powerButton, text, displayPercentWater, displayPercentMilk, displayPercentCoffee];

window.onload = function() {
    Storage.checkStorage('milk', coffeeMachine.milk);
    Storage.checkStorage('water', coffeeMachine.water);
    Storage.checkStorage('coffee', coffeeMachine.coffee);

    showPercent(calc('milk'), 'milk');
    showPercent(calc('water'), 'water');
    showPercent(calc('coffee'), 'coffee');
}

function showModal() { //Show popup window 
    popup.modal.classList.toggle('show');
    popup.modalWrap.classList.toggle('show');
    aside.classList.remove('show');
    document.querySelector('.left-child').classList.toggle('blur');

    defaultWaterQuantity.textContent = coffeeMachine.defaultWater;
    waterQuantity.textContent = `${Storage.getItem('water')}/`;
    defaultMilkQuantity.textContent = coffeeMachine.defaultMilk;
    milkQuantity.textContent = `${Storage.getItem('milk')}/`;
    defaultCoffeeQuantity.textContent = coffeeMachine.defaultCoffee;
    coffeeQuantity.textContent = `${Storage.getItem('coffee')}/`;
} 

function switchOn() {
    if (!power) { // Checks that the coffee machine is turned off
        power = true;
        enableCoffeeTypesButtons();
        enableStartButton();
        smallPowerBtn.style.backgroundColor = 'rgb(20, 204, 20)';
    }
    else { // Checks that the coffee machine is turned on
        power = false;
        disableCoffeeTypesButtons();
        disableStartButton();
        text.value = '';
        text.style.backgroundColor = null;
        smallPowerBtn.style.backgroundColor = 'rgb(255, 61, 61)';
    }
}

function resetAlertTextContent() {
    popup.alertText.textContent = '';
    popup.alert.style.display = 'none';
}

function addAlertTextContent(product, coffee) { 
    popup.alertText.textContent = `Not enought ${product} to make ${coffee}!`;
    popup.alert.style.display = 'flex';
}

function checkPossibility(coffeeType, makeCoffee) { //Checks the possibility of making coffee
    if (Storage.getItem('coffee') >= coffeeType.coffee
    && Storage.getItem('water') >= coffeeType.water
    && Storage.getItem('milk') >= coffeeType.milk) {
        makeCoffee();
    }
    else if (Storage.getItem('coffee') < coffeeType.coffee) {
        showModal();
        addAlertTextContent('coffee beans', coffeeType.name);
        console.log(`Not enought coffee beans to make latte!`);
    }
    else if (Storage.getItem('water') < coffeeType.water) {
        showModal();
        addAlertTextContent('water', coffeeType.name);
        console.log(`Not enought water to make latte!`);
    }
    else if (Storage.getItem('milk') < coffeeType.milk) {
        showModal();
        addAlertTextContent('milk', coffeeType.name);
        console.log(`Not enought milk to make latte!`);
    }
}

function chooseType() {
    switch(text.value) {
        case customCoffee.name:
            if (customCoffee.name !== '') {
                checkPossibility(customCoffee, makeCustomCoffee);
            }
            break;
        case 'espresso':
            checkPossibility(espresso, makeEspresso);
            break;
        case 'latte':
            checkPossibility(latte, makeLatte);
            break;
        case 'americano':
            checkPossibility(americano, makeAmericano);
            break;
        case 'cappuccino':
            checkPossibility(cappuccino, makeCappuccino);
            break;
        default:
            console.log('You need to choose type');
    }
}

function enableCoffeeTypesButtons() {
    for (let i = 0; i < coffeeButtons.length; i++) {
        coffeeButtons[i].disabled = false;
    }
} 

function disableCoffeeTypesButtons() {
    for (let i = 0; i < coffeeButtons.length; i++) {
        coffeeButtons[i].disabled = true;
    }
}

function enableStartButton() {
    if (power) {
        startButton.disabled = false;
    }
}

function disableStartButton() {
    startButton.disabled = true;
}

function enableTakeCoffee() {
    takeCoffee.disabled = false;
}

function disableTakeCoffee() {
    takeCoffee.disabled = true;
}

function enableTakeCup() {
    takeCup.disabled = false;
}

function disableTakeCup() {
    takeCup.disabled = true;
}

const showPercent = function(percent, product) { //Display percent value of specific product 
    switch(product) {
        case 'water':
            displayPercentWater.textContent = `${percent}%`;
            Tank.water.style.height = `${percent}%`;
            break
        case 'milk':
            displayPercentMilk.textContent = `${percent}%`;
            Tank.milk.style.height = `${percent}%`;
            break
        case 'coffee':
            displayPercentCoffee.textContent = `${percent}%`;
            Tank.coffee.style.height = `${percent}%`;
            break
        default:
            console.log('Wrong argument in function');    
    }
    
    console.log(`${product} ${percent}%`);
}

const calc = function(product, value, defaultValue) { //Calculate the percent value of products remaining in coffee machine
    switch (product) {
        case 'water':
            value = Storage.getItem('water');
            defaultValue = coffeeMachine.defaultWater;
            break;
        case 'milk':
            value = Storage.getItem('milk');
            defaultValue = coffeeMachine.defaultMilk;
            break;
        case 'coffee':
            value = Storage.getItem('coffee');
            defaultValue = coffeeMachine.defaultCoffee;
    }

    return Math.round(value / defaultValue * 100);
}

function pourCoffee() { //Calls coffee pour animation
    setTimeout(function() {
        coffee.classList.add('pour');
        smallStartBtn.style.backgroundColor = 'rgb(255, 202, 87)';
    }, 1000);
}

function removePourCoffee() { //Prevents from call coffee pour animation
    setTimeout(function() {
        coffee.classList.remove('pour');
        smallStartBtn.style.backgroundColor = '#777';
        enableTakeCoffee();
    }, 8000);
}

function pourMilk() { //Calls milk pour animation
    setTimeout(function() {
        milk.classList.add('pour');

        smallStartBtn.style.backgroundColor = 'rgb(255, 202, 87)';
    }, 1000);
}

function removePourMilk() { //Prevents from call milk pour animation
    setTimeout(function() {
        milk.classList.remove('pour');
        smallStartBtn.style.backgroundColor = '#777';
        enableTakeCoffee();
    }, 8000);
}

function pourCoffeeAndMilk() { //Calls milk and coffee pour animation
    setTimeout(function() {
        coffee.classList.add('pour');
        milk.classList.add('pour');

        smallStartBtn.style.backgroundColor = 'rgb(255, 202, 87)';
    }, 1000);
}

function removePourCoffeeAndMilk() { //Prevents from call milk and coffee pour animation
    setTimeout(function() {
        coffee.classList.remove('pour');
        milk.classList.remove('pour');
        smallStartBtn.style.backgroundColor = '#777';
        enableTakeCoffee();
    }, 8000);
}

function addItemtoStorage(item, value) {
    Storage.setItem(item, Storage.getItem(item) - value);
    showPercent(calc(item), item);
}

function makeCustomCoffee() {
    disableStartButton();

    if (coffeeRange.value >= milkRange.value) {
        if (milkRange.value === '0') {
            pourCoffee();
            removePourCoffee();
        }
        else {
            pourCoffeeAndMilk();
            removePourCoffeeAndMilk();
        }

        addItemtoStorage('water', coffeeRange.value * 2);
        addItemtoStorage('milk', milkRange.value * 3);
        addItemtoStorage('coffee', customCoffee.coffee);
    }
    else if (coffeeRange.value < milkRange.value) {
        if (coffeeRange.value === '0') {
            pourMilk();
            removePourMilk();
        }
        else {
            pourCoffeeAndMilk();
            removePourCoffeeAndMilk();
        }

        addItemtoStorage('water', latte.water);
        addItemtoStorage('milk', latte.milk);
        addItemtoStorage('coffee', latte.coffee);
    }
    
    setTimeout(function() {
        innerCup.style.height = `${fillRange.value}%`;
        Cup.coffee.style.height = `${coffeeRange.value}%`;
        Cup.milk.style.height = `${milkRange.value}%`;
        Cup.foam.style.height = `${foamRange.value}%`;
    }, 2000);
    
    console.log(coffeeMachine.coffee);
}

function makeEspresso() {
    disableStartButton();
    pourCoffee();
    removePourCoffee();

    setTimeout(function() {
        Cup.coffee.style.height = '40%';
    }, 2000);
    
    addItemtoStorage('water', espresso.water);
    addItemtoStorage('milk', espresso.milk);
    addItemtoStorage('coffee', espresso.coffee);
}

function makeLatte() {
    disableStartButton();
    pourCoffeeAndMilk();
    removePourCoffeeAndMilk();

    setTimeout(function() {
        Cup.coffee.style.height = '20%';
        Cup.milk.style.height = '85%';
        Cup.foam.style.height = '95%';
    }, 2000);

    addItemtoStorage('water', latte.water);
    addItemtoStorage('milk', latte.milk);
    addItemtoStorage('coffee', latte.coffee);
}

function makeAmericano() {
    disableStartButton();
    pourCoffee();
    removePourCoffee();

    setTimeout(function() {
        Cup.coffee.style.height = '95%';
    }, 2000);

    addItemtoStorage('water', americano.water);
    addItemtoStorage('milk', americano.milk);
    addItemtoStorage('coffee', americano.coffee);
}

function makeCappuccino() {
    disableStartButton();
    pourCoffeeAndMilk();
    removePourCoffeeAndMilk();

    setTimeout(function() {
        Cup.coffee.style.height = '30%';
        Cup.milk.style.height = '65%';
        Cup.foam.style.height = '95%';
    }, 2000);

    addItemtoStorage('water', cappuccino.water);
    addItemtoStorage('milk', cappuccino.milk);
    addItemtoStorage('coffee', cappuccino.coffee);
}

function getCup() { // Put empty cup on the stand
    for (let i = 0; i < cupElements.length; i++) {
        cupElements[i].style.display = 'block';  
    }

    cup.style.visibility = 'visible';
    
    enableStartButton();
}

takeCup.addEventListener('click', function() {
    getCup();
    disableTakeCup();
});

takeCoffee.addEventListener('click', function() { // Take a cup of coffee from the stand
    cup.style.visibility = 'hidden';
    
    for (let i = 0; i < cupElements.length; i++) {
        cupElements[i].style.display = 'none';  
    }

    for (let i = 0; i < cupElements.length; i++) {
        cupElements[i].style.height = '0';  
    }

    disableTakeCoffee();
    enableTakeCup();
});

startButton.addEventListener('click', function() { // Run coffee machine, by click on start button
    chooseType();
});

powerButton.addEventListener('click', function() {  // Start the program, by click on power button
    powerButton.classList.toggle('power-default');

    for (let i = 0; i < activeElements.length; i++) {
        activeElements[i].classList.toggle('active');
    }

    switchOn();
});
                            // Coffee selection buttons
espressoButton.addEventListener('click', function() { // espresso selection button
    text.value = 'espresso';
});

latteButton.addEventListener('click', function() { // latte selection button
    text.value = 'latte';
});

americanoButton.addEventListener('click', function() { // americano selection button
    text.value = 'americano';
});

cappuccinoButton.addEventListener('click', function() { // cappuccino selection button
    text.value = "cappuccino";
});

showMenu.addEventListener('click', function() {
    coffeeMenu.classList.toggle('show');
    aside.classList.remove('show');
});

popup.closeModalIcon.addEventListener('click', showModal);

refillTanks.addEventListener('click', showModal);

popup.addCoffeeIcon.addEventListener('click', function() {
    Storage.setItem('coffee', coffeeMachine.defaultCoffee);
    coffeeQuantity.textContent = `${Storage.getItem('coffee')}/`;
    showPercent(calc('coffee'), 'coffee');
    resetAlertTextContent();
});

popup.addMilkIcon.addEventListener('click', function() {
    Storage.setItem('milk', coffeeMachine.defaultMilk);
    milkQuantity.textContent = `${Storage.getItem('milk')}/`;
    showPercent(calc('milk'), 'milk');
    resetAlertTextContent();
});

popup.addWaterIcon.addEventListener('click', function() {
    Storage.setItem('water', coffeeMachine.defaultWater);
    waterQuantity.textContent = `${Storage.getItem('water')}/`;
    showPercent(calc('water'), 'water');
    resetAlertTextContent();
});

showAside.addEventListener('click', function() {
    aside.classList.toggle('show');
});

mugIcon.addEventListener('click', function() {
    coffeeCreation.classList.toggle('show');
    coffeeCreationWrap.classList.toggle('show');
    aside.classList.remove('show');
    document.querySelector('.left-child').classList.toggle('blur');
});

closeCoffeeCreatorIcon.addEventListener('click', function() {
    coffeeCreation.classList.toggle('show');
    coffeeCreationWrap.classList.toggle('show');
    document.querySelector('.left-child').classList.toggle('blur');
});

closeCoffeeMenu.addEventListener('click', function() {
    coffeeMenu.classList.toggle('show');
});

coffeeRange.addEventListener('change', function() {
    innerCoffee.style.height = `${coffeeRange.value}%`;
});

milkRange.addEventListener('change', function() {
    innerMilk.style.height = `${milkRange.value}%`;
});

foamRange.addEventListener('change', function() {
    innerFoam.style.height = `${foamRange.value}%`;
});

fillRange.addEventListener('change', function() {
    inner.style.height = `${fillRange.value}%`;
});

customCoffeeButton.addEventListener('click', function() {
    if (customCoffeeInput.value === ''){
        console.log('Custom coffee name in not defined!');
        addToCoffeeMachine.disabled = true;
    }
    else {
        customCoffee.name = customCoffeeInput.value;
        console.log(customCoffee.name);
        addToCoffeeMachine.disabled = false;
    }
});

addToCoffeeMachine.addEventListener('click', function() {
    text.value = customCoffee.name;
});

coffeeCreationWrap.addEventListener('click', function(event) {
    if (!event.target.closest('.coffee-creation')) {
        coffeeCreation.classList.remove('show');
        coffeeCreationWrap.classList.remove('show');
        document.querySelector('.left-child').classList.remove('blur');
        console.log('work!');
    }
});

popup.modalWrap.addEventListener('click', function(event) {
    if (!event.target.closest('.modal')) {
        showModal();
    }
});