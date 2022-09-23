import { Popup } from "./popup.js";
import { CoffeeMachine } from "./coffee-machine.js"
import { Coffee } from "./coffee.js";
import { Cup } from "./cup.js";
import { Tank } from "./tank.js";

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
const mugIcon = document.querySelector('.action-icons div:nth-child(3)')
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


const customCoffeeCoffee = customCoffee.coffee;
const espressoWater = espresso.water;
const espressoMilk = espresso.milk;
const espressoCoffee = espresso.coffee;
const latteWater = latte.water;
const latteMilk = latte.milk;
const latteCoffee = latte.coffee;
const americanoWater = americano.water;
const americanoMilk = americano.milk;
const americanoCoffee = americano.coffee;
const cappuccinoWater = americano.water;
const cappuccinoMilk = americano.milk;
const cappuccinoCoffee = americano.coffee;

let power = false;

const cupElements = [Cup.coffee, Cup.milk, Cup.foam];
const coffeeButtons = [espressoButton, latteButton, americanoButton, cappuccinoButton];
const activeElements = [powerButton, text, displayPercentWater, displayPercentMilk, displayPercentCoffee];

function showModal() { //Show popup window 
    popup.modal.classList.toggle('show');
    popup.modalWrap.classList.toggle('show');
    aside.classList.remove('show');
    document.querySelector('.left-child').classList.toggle('blur');

    defaultWaterQuantity.textContent = coffeeMachine.defaultWater;
    waterQuantity.textContent = `${coffeeMachine.water}/`;
    defaultMilkQuantity.textContent = coffeeMachine.defaultMilk;
    milkQuantity.textContent = `${coffeeMachine.milk}/`;
    defaultCoffeeQuantity.textContent = coffeeMachine.defaultCoffee;
    coffeeQuantity.textContent = `${coffeeMachine.coffee}/`;
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
    if(coffeeMachine.coffee >= coffeeType.coffee
    && coffeeMachine.water >= coffeeType.water
    && coffeeMachine.milk >= coffeeType.milk) {
        makeCoffee;
    }
    else if (coffeeMachine.coffee < coffeeType.coffee) {
        showModal();
        addAlertTextContent('coffee beans', coffeeType.name);
        console.log(`Not enought coffee beans to make latte!`);
    }
else if (coffeeMachine.water < coffeeType.water) {
    showModal();
    addAlertTextContent('water', coffeeType.name);
    console.log(`Not enought water to make latte!`);
}
else if (coffeeMachine.milk < coffeeType.milk) {
    showModal();
    addAlertTextContent('milk', coffeeType.name);
    console.log(`Not enought milk to make latte!`);
}
}

function chooseType() {
    let makeCoffee;

    switch(text.value) {
        case customCoffee.name:
            makeCoffee = makeCustomCoffee();
            checkPossibility(customCoffee, makeCoffee);
            break;
        case 'espresso':
            makeCoffee = makeEspresso();
            checkPossibility(espresso, makeCoffee);
            break;
        case 'latte':
            makeCoffee = makeLatte();
            checkPossibility(cappuccino, makeCoffee);
            break;
        case 'americano':
            makeCoffee = makeAmericano();
            checkPossibility(americano, makeCoffee);
            break;
        case 'cappuccino':
            makeCoffee = makeCappuccino();
            checkPossibility(cappuccino, makeCoffee);
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

const calc = function(product, value, defaultValue) { //Calculate the percent value of remaining products in coffee machine
    let coffeeMachineDefaultWater = coffeeMachine.defaultWater;
    let coffeeMachineDefaultMilk = coffeeMachine.defaultMilk;
    let coffeeMachineDefaultCoffee = coffeeMachine.defaultCoffee;

    let coffeeMachineWater = coffeeMachine.water;
    let coffeeMachineMilk = coffeeMachine.milk;
    let coffeeMachineCoffee = coffeeMachine.coffee;

    switch (product) {
        case 'water':
            value = coffeeMachineWater;
            defaultValue = coffeeMachineDefaultWater;
            break;
        case 'milk':
            value = coffeeMachineMilk;
            defaultValue = coffeeMachineDefaultMilk;
            break;
        case 'coffee':
            value = coffeeMachineCoffee;
            defaultValue = coffeeMachineDefaultCoffee;
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

        coffeeMachine.water -= coffeeRange.value * 2;
        showPercent(calc('water'), 'water');

        coffeeMachine.milk -=  milkRange.value * 3;
        showPercent(calc('milk'), 'milk');

        coffeeMachine.coffee -= customCoffeeCoffee;
        showPercent(calc('coffee'), 'coffee');
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

        coffeeMachine.water -= coffeeRange.value * 2;
        showPercent(calc('water'), 'water');

        coffeeMachine.milk -= milkRange.value * 3;
        showPercent(calc('milk'), 'milk');

        coffeeMachine.coffee -= customCoffeeCoffee;
        showPercent(calc('coffee'), 'coffee');        
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
    
    coffeeMachine.water -= espressoWater;
    showPercent(calc('water'), 'water');

    coffeeMachine.milk -= espressoMilk;
    showPercent(calc('milk'), 'milk');

    coffeeMachine.coffee -= espressoCoffee;
    showPercent(calc('coffee'), 'coffee');
    
    console.log(coffeeMachine.coffee);
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

    coffeeMachine.water -= latteWater;
    showPercent(calc('water'), 'water');

    coffeeMachine.milk -= latteMilk;
    showPercent(calc('milk'), 'milk');

    coffeeMachine.coffee -= latteCoffee;
    showPercent(calc('coffee'), 'coffee');

    console.log(coffeeMachine.coffee);
}

function makeAmericano() {
    disableStartButton();
    pourCoffee();
    removePourCoffee();

    setTimeout(function() {
        Cup.coffee.style.height = '95%';
    }, 2000);

    coffeeMachine.water -= americanoWater;
    showPercent(calc('water'), 'water');

    coffeeMachine.milk -= americanoMilk;
    showPercent(calc('milk'), 'milk');

    coffeeMachine.coffee -= americanoCoffee;
    showPercent(calc('coffee'), 'coffee');

    console.log(coffeeMachine.coffee);
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

    coffeeMachine.water -= cappuccinoWater;
    showPercent(calc('water'), 'water');

    coffeeMachine.milk -= cappuccinoMilk;
    showPercent(calc('milk'), 'milk');

    coffeeMachine.coffee -= cappuccinoCoffee;
    showPercent(calc('coffee'), 'coffee');
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
    coffeeMachine.coffee = coffeeMachine.defaultCoffee;
    coffeeQuantity.textContent = `${coffeeMachine.coffee}/`;
    showPercent(calc('coffee'), 'coffee');
    resetAlertTextContent();
});

popup.addMilkIcon.addEventListener('click', function() {
    coffeeMachine.milk = coffeeMachine.defaultMilk;
    milkQuantity.textContent = `${coffeeMachine.defaultMilk}/`;
    showPercent(calc('milk'), 'milk');
    resetAlertTextContent();
});

popup.addWaterIcon.addEventListener('click', function() {
    coffeeMachine.water = coffeeMachine.defaultWater;
    waterQuantity.textContent = `${coffeeMachine.water}/`;
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
    }
    else {
        customCoffee.name = customCoffeeInput.value;
        console.log(customCoffee.name);
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