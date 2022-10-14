import { Popup } from "./popup.js";
import { CoffeeMachine } from "./coffeeMachine.js";
import { Coffee } from "./coffee.js";
import { Cup } from "./cup.js";
import { Tank } from "./tank.js";
import { Storage } from "./storage.js";
import { CoffeeCreator } from "./coffeeCreator.js";
import { CoffeeMenu } from "./coffeeMenu.js";
import { CoffeeMachineUI } from "./coffeeMachineUI.js";

const coffeeMachine = new CoffeeMachine(1750, 2400, 500, 15);
const espresso = new Coffee('espresso', 30, 0, 8);
const latte = new Coffee('latte', 60, 300, 16);
const americano = new Coffee('americano', 150, 0, 16);
const cappuccino = new Coffee('cappuccino', 60, 120, 16);
const customCoffee = new Coffee('', 100, 200, 16);

let makedCoffee = 0;
let createdCustomCoffee = 0;
let espressoType = 0, latteType = 0, americanoType = 0, cappuccinoType = 0;
let power = false;

window.onload = function() {
    checkStorage('makedCoffee', makedCoffee);
    checkStorage('createdCustomCoffee', createdCustomCoffee);
    checkStorage('espressoType', espressoType);
    checkStorage('latteType', latteType);
    checkStorage('americanoType', americanoType);
    checkStorage('cappuccinoType', cappuccinoType);
    checkStorage('milk', coffeeMachine.milk);
    checkStorage('water', coffeeMachine.water);
    checkStorage('coffee', coffeeMachine.coffee);
    checkStorage('coffeeRange', CoffeeCreator.coffeeRange.value);
    checkStorage('milkRange', CoffeeCreator.milkRange.value);
    checkStorage('foamRange', CoffeeCreator.foamRange.value);
    checkStorage('fillRange', CoffeeCreator.fillRange.value);
    checkStorage('customCoffeeName', customCoffee.name);

    makedCoffee = Storage.getItem('makedCoffee');
    createdCustomCoffee = Storage.getItem('createdCustomCoffee');
    espressoType = Storage.getItem('espressoType');
    latteType = Storage.getItem('latteType');
    americanoType = Storage.getItem('americanoType');
    cappuccinoType = Storage.getItem('cappuccinoType');
    Storage.setItem('favoriteCoffee', getFavoriteCoffeeType());

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

function checkStorage(name, value) {
    Storage.checkStorage(name, value);
}

function getFavoriteCoffeeType() {
    const favoriteCoffees = [{
        value: espressoType,
        name: 'espresso'
    },
    {
        value: latteType,
        name: 'latte'
    },
    {
        value: americanoType,
        name: 'americano'
    },
    {
        value: cappuccinoType,
        name: 'cappuccino'
    }];
    
    for (let i = 1; i < favoriteCoffees.length; i++) {
        let maxNum = favoriteCoffees[0];

        if (favoriteCoffees[i].value > maxNum.value) {
            maxNum = favoriteCoffees[i];
        }

        return maxNum.name;
    }
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
        Storage.setItem('makedCoffee', ++makedCoffee);
        console.log(`Maked coffee: ${Storage.getItem('makedCoffee')}`);
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

//Adds items to localStorage
function addItemtoStorage(item, value) {
    Storage.setItem(item, Storage.getItem(item) - value);
    showPercent(calc(item), item);
}

function makeCustomCoffee() {
    disableStartButton();

    Storage.setItem('createdCustomCoffee', ++createdCustomCoffee);

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
    Storage.setItem('espressoType', ++espressoType);

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
    Storage.setItem('latteType', ++latteType);

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
    Storage.setItem('americanoType', ++americanoType);

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
    Storage.setItem('cappuccinoType', ++cappuccinoType);

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

function calculateValueToRefill(name, item, range) {
    let coffeeValue = item * range / 100;
    let coffeeValueTotal = Number(Storage.getItem(name));

    coffeeValueTotal += coffeeValue;

    if (coffeeValueTotal > item) {
        coffeeValueTotal = item;
    }

    return coffeeValueTotal;
}

//Event delegation
function selectElement(type, selector, callback) {
    document.addEventListener(type, (event) => {
        if (event.target.closest(selector)) {
            callback(event);
        }
    });
}


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

//Turn on coffee machine, by click on power button
selectElement('click', '#power', (event) => {
    const activeElements = [CoffeeMachineUI.powerButton, CoffeeMachineUI.text, Tank.displayPercentWater, Tank.displayPercentMilk, Tank.displayPercentCoffee];

    CoffeeMachineUI.powerButton.classList.toggle('power-default');
    
    for (let i = 0; i < activeElements.length; i++) {
        activeElements[i].classList.toggle('active');
    }

    switchOn();
});

//Starts coffee machine program
CoffeeMachineUI.startButton.addEventListener('click', function() {
    chooseType();
});

// espresso selection button
selectElement('click', '.espresso-btn', (event) => {
    CoffeeMachineUI.text.value = 'espresso';
});

// latte selection button
selectElement('click', '.latte-btn', (event) => {
    CoffeeMachineUI.text.value = 'latte';
});

// americano selection button
selectElement('click', '.americano-btn', (event) => {
    CoffeeMachineUI.text.value = 'americano';
});

// cappuccino selection button
selectElement('click', '.cappuccino-btn', (event) => {
    CoffeeMachineUI.text.value = 'cappuccino';
});

selectElement('click', '#show-menu', (event) => {
    CoffeeMenu.coffeeMenu.classList.toggle('show');
    CoffeeMachineUI.aside.classList.remove('show');
});

selectElement('click', '.modal-top i', (event) => {
    showModal();
});

selectElement('click', '#refill-tanks', (event) => {
    showModal();
});

//Removes cup
selectElement('click', '.base button:nth-child(2)', (event) => {
    getCup();
    disableTakeCup();
});

//Takes a cup of coffee from the stand
selectElement('click', '.base button:nth-child(1)', (event) => {
    const cupElements = [Cup.coffee, Cup.milk, Cup.foam];

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

//Refills coffee tank
selectElement('click', '#add-coffee', (event) => {
    Storage.setItem('coffee', calculateValueToRefill('coffee', coffeeMachine.defaultCoffee, Popup.addCoffeeRange.value));
    Popup.coffeeQuantity.textContent = `${Storage.getItem('coffee')}/`;
    showPercent(calc('coffee'), 'coffee');
    resetAlertTextContent();
});

//Refills milk tank
selectElement('click', '#add-milk', (event) => {
    Storage.setItem('milk', calculateValueToRefill('milk', coffeeMachine.defaultMilk, Popup.addMilkRange.value));
    Popup.milkQuantity.textContent = `${Storage.getItem('milk')}/`;
    showPercent(calc('milk'), 'milk');
    resetAlertTextContent();
});

//Refills water tank
selectElement('click', '#add-water', (event) => {
    Storage.setItem('water', calculateValueToRefill('water', coffeeMachine.defaultWater, Popup.addWaterRange.value));
    Popup.waterQuantity.textContent = `${Storage.getItem('water')}/`;
    showPercent(calc('water'), 'water');
    resetAlertTextContent();
});

//Shows aside menu
selectElement('click', '#menu-bars', (event) => {
    CoffeeMachineUI.aside.classList.toggle('show');
});

//Shows coffee creator
selectElement('click', '#create-coffee', (event) => {
    CoffeeCreator.coffeeCreation.classList.toggle('show');
    CoffeeCreator.coffeeCreationWrap.classList.toggle('show');
    CoffeeMachineUI.aside.classList.remove('show');
    document.querySelector('.left-child').classList.toggle('blur');
});

//Closes coffee creator
selectElement('click', '.coffee-creation-top i', (event) => {
    CoffeeCreator.coffeeCreation.classList.toggle('show');
    CoffeeCreator.coffeeCreationWrap.classList.toggle('show');
    document.querySelector('.left-child').classList.toggle('blur');
});

//Closes coffee menu
selectElement('click', '.menu-top i', (event) => {
    CoffeeMenu.coffeeMenu.classList.toggle('show');
});

//Set coffee level of custom coffee 
selectElement('input', '#coffee-range', (event) => {
    Storage.setItem('coffeeRange', CoffeeCreator.coffeeRange.value);
    CoffeeCreator.innerCoffee.style.height = `${Storage.getItem('coffeeRange')}%`;
});

//Set milk level of custom coffee 
selectElement('input', '#milk-range', (event) => {
    Storage.setItem('milkRange', CoffeeCreator.milkRange.value);
    CoffeeCreator.innerMilk.style.height = `${Storage.getItem('milkRange')}%`;
});

//Set milk foam level of custom coffee 
selectElement('input', '#foam-range', (event) => {
    Storage.setItem('foamRange', CoffeeCreator.foamRange.value);
    CoffeeCreator.innerFoam.style.height = `${Storage.getItem('foamRange')}%`;
});

//Set fill level of custom coffee 
selectElement('input', '#fill-range', (event) => {
    Storage.setItem('fillRange', CoffeeCreator.fillRange.value);
    CoffeeCreator.inner.style.height = `${Storage.getItem('fillRange')}%`;
});

//Simple coffee creator form validation
selectElement('click', '.custom-name button', (event) => {
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

//Adds custom coffee to coffee machine
selectElement('click', '#add-to-coffee-machine', (event) => {
    event.preventDefault();

    CoffeeMachineUI.text.value = customCoffee.name;
    CoffeeCreator.addedToCoffeeMachineMessage.removeAttribute('hidden');

    setTimeout(() => CoffeeCreator.addedToCoffeeMachineMessage.setAttribute('hidden', 'hidden'), 4000);
});

//Closes coffee creator modal by click outside the modal window
selectElement('click', '.coffee-creation-wrap', (event) => {
    if (!event.target.closest('.coffee-creation')) {
        CoffeeCreator.coffeeCreation.classList.remove('show');
        CoffeeCreator.coffeeCreationWrap.classList.remove('show');
        document.querySelector('.left-child').classList.remove('blur');
    }
});

//Closes refill tanks modal by click outside the modal window
selectElement('click', '.modal-wrap', (event) => {
    if (!event.target.closest('.modal')) {
        showModal();
    }
});

//Reset custom coffee creator to default values
selectElement('click', '#reset-custom-coffee', (event) => {
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


