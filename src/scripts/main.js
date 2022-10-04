import { Popup } from "./popup.js";
import { CoffeeMachine } from "./coffeeMachine.js";
import { Coffee } from "./coffee.js";
import { Cup } from "./cup.js";
import { Tank } from "./tank.js";
import { Storage } from "./storage.js";
import { CoffeeCreator } from "./coffeeCreator.js";
import { CoffeeMenu } from "./coffeeMenu.js";
import { Aside } from "./aside.js";
import { CoffeeMachineUI } from "./coffeeMachineUI.js";

const coffeeMachine = new CoffeeMachine(1750, 2400, 500, 15);
const espresso = new Coffee('espresso', 30, 0, 8);
const latte = new Coffee('latte', 60, 300, 16);
const americano = new Coffee('americano', 150, 0, 16);
const cappuccino = new Coffee('cappuccino', 60, 120, 16);
const customCoffee = new Coffee('', 60, 100, 16);

let power = false;

const cupElements = [Cup.coffee, Cup.milk, Cup.foam];
const coffeeButtons = [CoffeeMachineUI.espressoButton, CoffeeMachineUI.latteButton, CoffeeMachineUI.americanoButton, CoffeeMachineUI.cappuccinoButton];
const activeElements = [CoffeeMachineUI.powerButton, CoffeeMachineUI.text, Tank.displayPercentWater, Tank.displayPercentMilk, Tank.displayPercentCoffee];

window.onload = function() {
    Storage.checkStorage('milk', coffeeMachine.milk);
    Storage.checkStorage('water', coffeeMachine.water);
    Storage.checkStorage('coffee', coffeeMachine.coffee);

    showPercent(calc('milk'), 'milk');
    showPercent(calc('water'), 'water');
    showPercent(calc('coffee'), 'coffee');
}

function showModal() { //Show popup window 
    Popup.modal.classList.toggle('show');
    Popup.modalWrap.classList.toggle('show');
    CoffeeMachineUI.aside.classList.remove('show');
    document.querySelector('.left-child').classList.toggle('blur');

    Popup.defaultWaterQuantity.textContent = coffeeMachine.defaultWater;
    Popup.waterQuantity.textContent = `${Storage.getItem('water')}/`;
    Popup.defaultMilkQuantity.textContent = coffeeMachine.defaultMilk;
    Popup.milkQuantity.textContent = `${Storage.getItem('milk')}/`;
    Popup.defaultCoffeeQuantity.textContent = coffeeMachine.defaultCoffee;
    Popup.coffeeQuantity.textContent = `${Storage.getItem('coffee')}/`;
} 

function switchOn() {
    if (!power) { // Checks that the coffee machine is turned off
        power = true;
        enableCoffeeTypesButtons();
        enableStartButton();
        CoffeeMachineUI.smallPowerBtn.style.backgroundColor = 'rgb(20, 204, 20)';
    }
    else { // Checks that the coffee machine is turned on
        power = false;
        disableCoffeeTypesButtons();
        disableStartButton();
        CoffeeMachineUI.text.value = '';
        CoffeeMachineUI.text.style.backgroundColor = null;
        CoffeeMachineUI.smallPowerBtn.style.backgroundColor = 'rgb(255, 61, 61)';
    }
}

function resetAlertTextContent() {
    Popup.alertText.textContent = '';
    Popup.alert.style.display = 'none';
}

function addAlertTextContent(product, coffee) { 
    Popup.alertText.textContent = `Not enought ${product} to make ${coffee}!`;
    Popup.alert.style.display = 'flex';
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
    switch(CoffeeMachineUI.text.value) {
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
        CoffeeMachineUI.startButton.disabled = false;
    }
}

function disableStartButton() {
    CoffeeMachineUI.startButton.disabled = true;
}

function enableTakeCoffee() {
    CoffeeMachineUI.takeCoffee.disabled = false;
}

function disableTakeCoffee() {
    CoffeeMachineUI.takeCoffee.disabled = true;
}

function enableTakeCup() {
    CoffeeMachineUI.takeCup.disabled = false;
}

function disableTakeCup() {
    CoffeeMachineUI.takeCup.disabled = true;
}

const showPercent = function(percent, product) { //Display percent value of specific product 
    switch(product) {
        case 'water':
            Tank.displayPercentWater.textContent = `${percent}%`;
            Tank.water.style.height = `${percent}%`;
            break
        case 'milk':
            Tank.displayPercentMilk.textContent = `${percent}%`;
            Tank.milk.style.height = `${percent}%`;
            break
        case 'coffee':
            Tank.displayPercentCoffee.textContent = `${percent}%`;
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
        CoffeeMachineUI.coffee.classList.add('pour');
        CoffeeMachineUI.smallStartBtn.style.backgroundColor = 'rgb(255, 202, 87)';
    }, 1000);
}

function removePourCoffee() { //Prevents from call coffee pour animation
    setTimeout(function() {
        CoffeeMachineUI.coffee.classList.remove('pour');
        CoffeeMachineUI.smallStartBtn.style.backgroundColor = '#777';
        enableTakeCoffee();
    }, 8000);
}

function pourMilk() { //Calls milk pour animation
    setTimeout(function() {
        CoffeeMachineUI.milk.classList.add('pour');

        CoffeeMachineUI.smallStartBtn.style.backgroundColor = 'rgb(255, 202, 87)';
    }, 1000);
}

function removePourMilk() { //Prevents from call milk pour animation
    setTimeout(function() {
        CoffeeMachineUI.milk.classList.remove('pour');
        CoffeeMachineUI.smallStartBtn.style.backgroundColor = '#777';
        enableTakeCoffee();
    }, 8000);
}

function pourCoffeeAndMilk() { //Calls milk and coffee pour animation
    setTimeout(function() {
        CoffeeMachineUI.coffee.classList.add('pour');
        CoffeeMachineUI.milk.classList.add('pour');

        CoffeeMachineUI.smallStartBtn.style.backgroundColor = 'rgb(255, 202, 87)';
    }, 1000);
}

function removePourCoffeeAndMilk() { //Prevents from call milk and coffee pour animation
    setTimeout(function() {
        CoffeeMachineUI.coffee.classList.remove('pour');
        CoffeeMachineUI.milk.classList.remove('pour');
        CoffeeMachineUI.smallStartBtn.style.backgroundColor = '#777';
        enableTakeCoffee();
    }, 8000);
}

function addItemtoStorage(item, value) {
    Storage.setItem(item, Storage.getItem(item) - value);
    showPercent(calc(item), item);
}

function makeCustomCoffee() {
    disableStartButton();

    if (CoffeeCreator.coffeeRange.value >= CoffeeCreator.milkRange.value) {
        if (CoffeeCreator.milkRange.value === '0') {
            pourCoffee();
            removePourCoffee();
        }
        else {
            pourCoffeeAndMilk();
            removePourCoffeeAndMilk();
        }

        addItemtoStorage('water', CoffeeCreator.coffeeRange.value * 2);
        addItemtoStorage('milk', CoffeeCreator.milkRange.value * 3);
        addItemtoStorage('coffee', customCoffee.coffee);
    }
    else if (CoffeeCreator.coffeeRange.value < CoffeeCreator.milkRange.value) {
        if (CoffeeCreator.coffeeRange.value === '0') {
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
        CoffeeMachineUI.innerCup.style.height = `${CoffeeCreator.fillRange.value}%`;
        Cup.coffee.style.height = `${CoffeeCreator.coffeeRange.value}%`;
        Cup.milk.style.height = `${CoffeeCreator.milkRange.value}%`;
        Cup.foam.style.height = `${CoffeeCreator.foamRange.value}%`;
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

    CoffeeMachineUI.cup.style.visibility = 'visible';
    
    enableStartButton();
}

CoffeeMachineUI.takeCup.addEventListener('click', function() {
    getCup();
    disableTakeCup();
});

CoffeeMachineUI.takeCoffee.addEventListener('click', function() { // Take a cup of coffee from the stand
    CoffeeMachineUI.cup.style.visibility = 'hidden';
    
    for (let i = 0; i < cupElements.length; i++) {
        cupElements[i].style.display = 'none';  
    }

    for (let i = 0; i < cupElements.length; i++) {
        cupElements[i].style.height = '0';  
    }

    disableTakeCoffee();
    enableTakeCup();
});

CoffeeMachineUI.startButton.addEventListener('click', function() { // Run coffee machine, by click on start button
    chooseType();
});

CoffeeMachineUI.powerButton.addEventListener('click', function() {  // Start the program, by click on power button
    CoffeeMachineUI.powerButton.classList.toggle('power-default');

    for (let i = 0; i < activeElements.length; i++) {
        activeElements[i].classList.toggle('active');
    }

    switchOn();
});
                            // Coffee selection buttons
CoffeeMachineUI.espressoButton.addEventListener('click', function() { // espresso selection button
    CoffeeMachineUI.text.value = 'espresso';
});

CoffeeMachineUI.latteButton.addEventListener('click', function() { // latte selection button
    CoffeeMachineUI.text.value = 'latte';
});

CoffeeMachineUI.americanoButton.addEventListener('click', function() { // americano selection button
    CoffeeMachineUI.text.value = 'americano';
});

CoffeeMachineUI.cappuccinoButton.addEventListener('click', function() { // cappuccino selection button
    CoffeeMachineUI.text.value = "cappuccino";
});

Aside.showMenu.addEventListener('click', function() {
    CoffeeMenu.coffeeMenu.classList.toggle('show');
    CoffeeMachineUI.aside.classList.remove('show');
});

Popup.closeModalIcon.addEventListener('click', showModal);

Aside.refillTanks.addEventListener('click', showModal);

function calculateValueToRefill(name, item, range) {
    let coffeeValue = item * range / 100;
    let coffeeValueTotal = Number(Storage.getItem(name));

    coffeeValueTotal += coffeeValue;

    if (coffeeValueTotal > item) {
        coffeeValueTotal = item;
    }

    return coffeeValueTotal;
}

Popup.addCoffeeIcon.addEventListener('click', function() {
    Storage.setItem('coffee', calculateValueToRefill('coffee', coffeeMachine.defaultCoffee, Popup.addCoffeeRange.value));
    Popup.coffeeQuantity.textContent = `${Storage.getItem('coffee')}/`;
    showPercent(calc('coffee'), 'coffee');
    resetAlertTextContent();
});

Popup.addMilkIcon.addEventListener('click', function() {
    Storage.setItem('milk', calculateValueToRefill('milk', coffeeMachine.defaultMilk, Popup.addMilkRange.value));
    Popup.milkQuantity.textContent = `${Storage.getItem('milk')}/`;
    showPercent(calc('milk'), 'milk');
    resetAlertTextContent();
});

Popup.addWaterIcon.addEventListener('click', function() {
    Storage.setItem('water', calculateValueToRefill('water', coffeeMachine.defaultWater, Popup.addWaterRange.value));
    Popup.waterQuantity.textContent = `${Storage.getItem('water')}/`;
    showPercent(calc('water'), 'water');
    resetAlertTextContent();
});

CoffeeMachineUI.showAside.addEventListener('click', function() {
   CoffeeMachineUI.aside.classList.toggle('show');
});

Aside.mugIcon.addEventListener('click', function() {
    CoffeeCreator.coffeeCreation.classList.toggle('show');
    CoffeeCreator.coffeeCreationWrap.classList.toggle('show');
    CoffeeMachineUI.aside.classList.remove('show');
    document.querySelector('.left-child').classList.toggle('blur');
});

CoffeeCreator.closeCoffeeCreatorIcon.addEventListener('click', function() {
    CoffeeCreator.coffeeCreation.classList.toggle('show');
    CoffeeCreator.coffeeCreationWrap.classList.toggle('show');
    document.querySelector('.left-child').classList.toggle('blur');
});

CoffeeMenu.closeCoffeeMenu.addEventListener('click', function() {
    CoffeeMenu.coffeeMenu.classList.toggle('show');
});

CoffeeCreator.coffeeRange.addEventListener('change', function() {
    CoffeeCreator.innerCoffee.style.height = `${CoffeeCreator.coffeeRange.value}%`;
});

CoffeeCreator.milkRange.addEventListener('change', function() {
    CoffeeCreator.innerMilk.style.height = `${CoffeeCreator.milkRange.value}%`;
});

CoffeeCreator.foamRange.addEventListener('change', function() {
    CoffeeCreator.innerFoam.style.height = `${CoffeeCreator.foamRange.value}%`;
});

CoffeeCreator.fillRange.addEventListener('change', function() {
    CoffeeCreator.inner.style.height = `${CoffeeCreator.fillRange.value}%`;
});

CoffeeCreator.customCoffeeButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    if (CoffeeCreator.customCoffeeInput.value === ''){
        console.log('Custom coffee name in not defined!');
        CoffeeCreator.customCoffeeInput.style.border = '3px solid brown';
        CoffeeCreator.customCoffeeName.classList.remove('success');
        CoffeeCreator.customCoffeeName.classList.add('error');
        CoffeeCreator.customCoffeeName.textContent = 'Custom coffee name is not defined!';
        CoffeeCreator.addToCoffeeMachine.disabled = true;
    }
    else {
        customCoffee.name = CoffeeCreator.customCoffeeInput.value;
        console.log(customCoffee.name);
        CoffeeCreator.customCoffeeInput.style.border = 'none';
        CoffeeCreator.customCoffeeName.classList.remove('error');
        CoffeeCreator.customCoffeeName.classList.add('success');
        CoffeeCreator.customCoffeeName.textContent = `Custom coffee name is set to ${customCoffee.name}`;
        CoffeeCreator.addToCoffeeMachine.disabled = false;

        setTimeout(() => {
            CoffeeCreator.customCoffeeName.classList.remove('success');
            CoffeeCreator.customCoffeeName.textContent = '';
        }, 3000);
    }
});

CoffeeCreator.addToCoffeeMachine.addEventListener('click', function(event) {
    event.preventDefault();

    CoffeeMachineUI.text.value = customCoffee.name;
    CoffeeCreator.addedToCoffeeMachineMessage.removeAttribute('hidden');

    setTimeout(() => CoffeeCreator.addedToCoffeeMachineMessage.setAttribute('hidden', 'hidden'), 4000);
});

CoffeeCreator.coffeeCreationWrap.addEventListener('click', function(event) {
    if (!event.target.closest('.coffee-creation')) {
        CoffeeCreator.coffeeCreation.classList.remove('show');
        CoffeeCreator.coffeeCreationWrap.classList.remove('show');
        document.querySelector('.left-child').classList.remove('blur');
        console.log('work!');
    }
});

Popup.modalWrap.addEventListener('click', function(event) {
    if (!event.target.closest('.modal')) {
        showModal();
    }
});