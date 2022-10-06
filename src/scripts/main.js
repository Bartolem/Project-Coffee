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
const customCoffee = new Coffee('', 100, 200, 16);

let power = false;

window.onload = function() {
    Storage.checkStorage('milk', coffeeMachine.milk);
    Storage.checkStorage('water', coffeeMachine.water);
    Storage.checkStorage('coffee', coffeeMachine.coffee);
    Storage.checkStorage('coffeeRange', CoffeeCreator.coffeeRange.value);
    Storage.checkStorage('milkRange', CoffeeCreator.milkRange.value);
    Storage.checkStorage('foamRange', CoffeeCreator.foamRange.value);
    Storage.checkStorage('fillRange', CoffeeCreator.fillRange.value);
    Storage.checkStorage('customCoffeeName', customCoffee.name);

    CoffeeCreator.customCoffeeInput.value = Storage.getItem('customCoffeeName');
    CoffeeCreator.coffeeRange.value = Storage.getItem('coffeeRange');
    CoffeeCreator.milkRange.value = Storage.getItem('milkRange');
    CoffeeCreator.foamRange.value = Storage.getItem('foamRange');
    CoffeeCreator.fillRange.value = Storage.getItem('fillRange');
    CoffeeCreator.innerCoffee.style.height = `${Storage.getItem('coffeeRange')}%`;
    CoffeeCreator.innerMilk.style.height = `${Storage.getItem('milkRange')}%`;
    CoffeeCreator.innerFoam.style.height = `${Storage.getItem('foamRange')}%`;
    CoffeeCreator.inner.style.height = `${Storage.getItem('fillRange')}%`;

    showPercent(calc('milk'), 'milk');
    showPercent(calc('water'), 'water');
    showPercent(calc('coffee'), 'coffee');
}

//Show popup window, that includes interface to refill fluid tanks 
function showModal() { 
    Popup.modal.classList.toggle('show');
    Popup.modalWrap.classList.toggle('show');
    CoffeeMachineUI.aside.classList.remove('show');
    document.querySelector('.left-child').classList.toggle('blur');

    Popup.coffeeValue.textContent =  `+ ${calculateValueToRefill('coffee', coffeeMachine.defaultCoffee, Popup.addCoffeeRange.value).toFixed() - Storage.getItem('coffee')}`;
    Popup.milkValue.textContent = `+ ${calculateValueToRefill('milk', coffeeMachine.defaultMilk, Popup.addMilkRange.value).toFixed()  - Storage.getItem('milk')}`;
    Popup.waterValue.textContent = `+ ${calculateValueToRefill('water', coffeeMachine.defaultWater, Popup.addWaterRange.value).toFixed() - Storage.getItem('water')}`;
    Popup.defaultWaterQuantity.textContent = coffeeMachine.defaultWater;
    Popup.waterQuantity.textContent = `${Storage.getItem('water')}/`;
    Popup.defaultMilkQuantity.textContent = coffeeMachine.defaultMilk;
    Popup.milkQuantity.textContent = `${Storage.getItem('milk')}/`;
    Popup.defaultCoffeeQuantity.textContent = coffeeMachine.defaultCoffee;
    Popup.coffeeQuantity.textContent = `${Storage.getItem('coffee')}/`;
} 

//Checks if coffee machine is turned on or off
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

//Checks the possibility of making the choosed coffee
function checkPossibility(coffeeType, makeCoffee) { 
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

//Choose with type of coffee will be making
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
    const coffeeButtons = [CoffeeMachineUI.espressoButton, CoffeeMachineUI.latteButton, CoffeeMachineUI.americanoButton, CoffeeMachineUI.cappuccinoButton];

    for (let i = 0; i < coffeeButtons.length; i++) {
        coffeeButtons[i].disabled = false;
    }
} 

function disableCoffeeTypesButtons() {
    const coffeeButtons = [CoffeeMachineUI.espressoButton, CoffeeMachineUI.latteButton, CoffeeMachineUI.americanoButton, CoffeeMachineUI.cappuccinoButton];

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

//Display percent value of specific product 
const showPercent = function(percent, product) { 
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

//Calculate the percent value of products remaining in coffee machine
const calc = function(product, value, defaultValue) { 
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

//Calls coffee pour animation
function pourCoffee() { 
    setTimeout(function() {
        CoffeeMachineUI.coffee.classList.add('pour');
        CoffeeMachineUI.smallStartBtn.style.backgroundColor = 'rgb(255, 202, 87)';
    }, 1000);
}

 //Prevents from call coffee pour animation
function removePourCoffee() {
    setTimeout(function() {
        CoffeeMachineUI.coffee.classList.remove('pour');
        CoffeeMachineUI.smallStartBtn.style.backgroundColor = '#777';
        enableTakeCoffee();
    }, 8000);
}

//Calls milk pour animation
function pourMilk() {
    setTimeout(function() {
        CoffeeMachineUI.milk.classList.add('pour');

        CoffeeMachineUI.smallStartBtn.style.backgroundColor = 'rgb(255, 202, 87)';
    }, 1000);
}

//Prevents from call milk pour animation
function removePourMilk() {
    setTimeout(function() {
        CoffeeMachineUI.milk.classList.remove('pour');
        CoffeeMachineUI.smallStartBtn.style.backgroundColor = '#777';
        enableTakeCoffee();
    }, 8000);
}

//Calls milk and coffee pour animation
function pourCoffeeAndMilk() {
    setTimeout(function() {
        CoffeeMachineUI.coffee.classList.add('pour');
        CoffeeMachineUI.milk.classList.add('pour');

        CoffeeMachineUI.smallStartBtn.style.backgroundColor = 'rgb(255, 202, 87)';
    }, 1000);
}

//Prevents from call milk and coffee pour animation
function removePourCoffeeAndMilk() { 
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

    customCoffee.water = (Storage.getItem('coffeeRange') * 2) * (Storage.getItem('fillRange') / 100);
    customCoffee.milk = (Storage.getItem('milkRange') * 3) * (Storage.getItem('fillRange') / 100);
    customCoffee.coffee = Storage.getItem('coffeeRange') / 5;

    function choosePourType(milkRange, coffeeRange, milkValue) {
        if (Number(milkRange) === 0 
        && Number(coffeeRange) === 0) {
            milkValue = (Storage.getItem('foamRange') * 3) * (Storage.getItem('fillRange') / 100);
            pourMilk();
            removePourMilk();
        }

    else if (coffeeRange >= milkRange) {
        if (Number(milkRange) === 0) {
            milkValue = (Storage.getItem('foamRange') * 3) * (Storage.getItem('fillRange') / 100);
            pourCoffee();
            removePourCoffee();
        }
        else {
            pourCoffeeAndMilk();
            removePourCoffeeAndMilk();
        }
    }
    else if (coffeeRange < milkRange) {
        if (Number(coffeeRange === 0)) {
            pourMilk();
            removePourMilk();
        }
        else {
            pourCoffeeAndMilk();
            removePourCoffeeAndMilk();
        }
    }
    }

    choosePourType(CoffeeCreator.milkRange.value, CoffeeCreator.coffeeRange.value, customCoffee.milk);

    addItemtoStorage('water', customCoffee.water);
    addItemtoStorage('milk', customCoffee.milk);
    addItemtoStorage('coffee', customCoffee.coffee);
    
    setTimeout(function() {
        CoffeeMachineUI.innerCup.style.height = `${CoffeeCreator.fillRange.value}%`;
        Cup.coffee.style.height = `${CoffeeCreator.coffeeRange.value}%`;
        Cup.milk.style.height = `${CoffeeCreator.milkRange.value}%`;
        Cup.foam.style.height = `${CoffeeCreator.foamRange.value}%`;
    }, 2000);
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

//Put empty cup on the stand
function getCup() { 
    const cupElements = [Cup.coffee, Cup.milk, Cup.foam];

    for (let i = 0; i < cupElements.length; i++) {
        cupElements[i].style.display = 'block';  
    }

    CoffeeMachineUI.cup.style.visibility = 'visible';
    
    enableStartButton();
}

//Remove cup
CoffeeMachineUI.takeCup.addEventListener('click', function() {
    getCup();
    disableTakeCup();
});

//Take a cup of coffee from the stand
CoffeeMachineUI.takeCoffee.addEventListener('click', function() { 
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

//Starts coffee machine program
CoffeeMachineUI.startButton.addEventListener('click', function() { 
    chooseType();
});

//Turn on coffee machine, by click on power button
CoffeeMachineUI.powerButton.addEventListener('click', function() {  
    const activeElements = [CoffeeMachineUI.powerButton, CoffeeMachineUI.text, Tank.displayPercentWater, Tank.displayPercentMilk, Tank.displayPercentCoffee];

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

Popup.addCoffeeRange.oninput = function() {
    Popup.coffeeValue.textContent = `+ ${calculateValueToRefill('coffee', coffeeMachine.defaultCoffee, Popup.addCoffeeRange.value).toFixed() - Storage.getItem('coffee')}`;
    Popup.addCoffeeRange.max = ((coffeeMachine.defaultCoffee - Storage.getItem('coffee')) / coffeeMachine.defaultCoffee * 100).toFixed();
};

Popup.addMilkRange.oninput = function() {
    Popup.milkValue.textContent = `+ ${calculateValueToRefill('milk', coffeeMachine.defaultMilk, Popup.addMilkRange.value).toFixed()  - Storage.getItem('milk')}`;
    Popup.addMilkRange.max = ((coffeeMachine.defaultMilk - Storage.getItem('milk')) / coffeeMachine.defaultMilk * 100).toFixed();
};

Popup.addWaterRange.oninput = function() {
    Popup.waterValue.textContent = `+ ${calculateValueToRefill('water', coffeeMachine.defaultWater, 
    Popup.addWaterRange.value).toFixed() - Storage.getItem('water')}`;
    Popup.addWaterRange.max = ((coffeeMachine.defaultWater - Storage.getItem('water')) / coffeeMachine.defaultWater * 100).toFixed();
};

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
    Storage.setItem('coffeeRange', CoffeeCreator.coffeeRange.value);
    CoffeeCreator.innerCoffee.style.height = `${Storage.getItem('coffeeRange')}%`;
});

CoffeeCreator.milkRange.addEventListener('change', function() {
    Storage.setItem('milkRange', CoffeeCreator.milkRange.value);
    CoffeeCreator.innerMilk.style.height = `${Storage.getItem('milkRange')}%`;
});

CoffeeCreator.foamRange.addEventListener('change', function() {
    Storage.setItem('foamRange', CoffeeCreator.foamRange.value);
    CoffeeCreator.innerFoam.style.height = `${Storage.getItem('foamRange')}%`;
});

CoffeeCreator.fillRange.addEventListener('change', function() {
    Storage.setItem('fillRange', CoffeeCreator.fillRange.value);
    CoffeeCreator.inner.style.height = `${Storage.getItem('fillRange')}%`;
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
        Storage.setItem('customCoffeeName', customCoffee.name);
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

CoffeeCreator.resetCoffeeCreator.addEventListener('click', function(event) {
    event.preventDefault();

    Storage.removeItem('coffeeRange');
    Storage.removeItem('milkRange');
    Storage.removeItem('foamRange');
    Storage.removeItem('fillRange');
    Storage.removeItem('customCoffeeName');
    
    CoffeeCreator.customCoffeeInput.value = Storage.getItem('customCoffeeName');
    CoffeeCreator.coffeeRange.value = Storage.getItem('coffeeRange');
    CoffeeCreator.milkRange.value = Storage.getItem('milkRange');
    CoffeeCreator.foamRange.value = Storage.getItem('foamRange');
    CoffeeCreator.fillRange.value = Storage.getItem('fillRange');
    CoffeeCreator.innerCoffee.style.height = `${CoffeeCreator.coffeeRange.value}%`;
    CoffeeCreator.innerMilk.style.height = `${CoffeeCreator.milkRange.value}%`;
    CoffeeCreator.innerFoam.style.height = `${CoffeeCreator.foamRange.value}%`;
    CoffeeCreator.inner.style.height = `${CoffeeCreator.fillRange.value}%`;
});

Popup.modalWrap.addEventListener('click', function(event) {
    if (!event.target.closest('.modal')) {
        showModal();
    }
});