class Cup {
    static getCoffee() {
        const coffee = document.querySelector('.cup-coffee');
        return coffee;
    }

    static getMilk() {
        const milk = document.querySelector('.cup-milk');
        return milk;
    }

    static getFoam() {
        const foam =  document.querySelector('.cup-foam');
        return foam;
    }
}

class Tank {
    static getCoffee() {
        const coffee = document.querySelector('.coffee-in-tank');;
        return coffee;
    }

    static getMilk() {
        const milk = document.querySelector('.milk-in-tank');;
        return milk;
    }

    static getWater() {
        const water = document.querySelector('.water-in-tank');
        return water;
    }     
}

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

const aside = document.querySelector('.action-icons');
const showMenu = document.querySelector('.action-icons div:first-child');
const refillTanks = document.querySelector('.action-icons div:nth-child(2)');
const showAside = document.getElementById('menu-bars');
const arrowIcon = document.querySelector('#arrow-icon');
const coffeeMenu = document.querySelector('.right-child');

const espressoWater = espresso.getWater();
const espressoMilk = espresso.getMilk();
const espressoCoffee = espresso.getCoffee();

const latteWater = latte.getWater();
const latteMilk = latte.getMilk();
const latteCoffee = latte.getCoffee();

const americanoWater = americano.getWater();
const americanoMilk = americano.getMilk();
const americanoCoffee = americano.getCoffee();

const cappuccinoWater = americano.getWater();
const cappuccinoMilk = americano.getMilk();
const cappuccinoCoffee = americano.getCoffee();

let percentWater, percentMilk, percentCoffee;
let power = false;

const cupElements = [Cup.getCoffee(), Cup.getMilk(), Cup.getFoam()];
const coffeeButtons = [espressoButton, latteButton, americanoButton, cappuccinoButton];
const activeElements = [powerButton, text, displayPercentWater, displayPercentMilk, displayPercentCoffee];

function showModal() { //Show popup window 
    popup.modal.classList.toggle('show');
    popup.modalWrap.classList.toggle('show');
    document.querySelector('.left-child').classList.toggle('blur');

    defaultWaterQuantity.textContent = coffeeMachine.getDefaultWater();
    waterQuantity.textContent = `${coffeeMachine.getWater()}/`;
    defaultMilkQuantity.textContent = coffeeMachine.getDefaultMilk();
    milkQuantity.textContent = `${coffeeMachine.getMilk()}/`;
    defaultCoffeeQuantity.textContent = coffeeMachine.getDefaultCoffee();
    coffeeQuantity.textContent = `${coffeeMachine.getCoffee()}/`;
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
    if(coffeeMachine.getCoffee() >= coffeeType.getCoffee()
    && coffeeMachine.getWater() >= coffeeType.getWater()
    && coffeeMachine.getMilk() >= coffeeType.getMilk()) {
        makeCoffee;
    }
    else if (coffeeMachine.getCoffee() < coffeeType.getCoffee()) {
        showModal();
        addAlertTextContent('coffee beans', coffeeType.name);
        console.log(`Not enought coffee beans to make latte!`);
    }
else if (coffeeMachine.getWater() < coffeeType.getWater()) {
    showModal();
    addAlertTextContent('water', coffeeType.name);
    console.log(`Not enought water to make latte!`);
}
else if (coffeeMachine.getMilk() < coffeeType.getMilk()) {
    showModal();
    addAlertTextContent('milk', coffeeType.name);
    console.log(`Not enought milk to make latte!`);
}
}

function chooseType() {
    let makeCoffee;

    switch(text.value) {
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
            Tank.getWater().style.height = `${percent}%`;
            break
        case 'milk':
            displayPercentMilk.textContent = `${percent}%`;
            Tank.getMilk().style.height = `${percent}%`;
            break
        case 'coffee':
            displayPercentCoffee.textContent = `${percent}%`;
            Tank.getCoffee().style.height = `${percent}%`;
            break
        default:
            console.log('Wrong argument in function');    
    }
    
    console.log(`${product} ${percent}%`);
}

const calc = function(product, value, defaultValue) { //Calculate the percent value of remaining products in coffee machine
    let coffeeMachineDefaultWater = coffeeMachine.getDefaultWater();
    let coffeeMachineDefaultMilk = coffeeMachine.getDefaultMilk();
    let coffeeMachineDefaultCoffee = coffeeMachine.getDefaultCoffee();

    let coffeeMachineWater = coffeeMachine.getWater();
    let coffeeMachineMilk = coffeeMachine.getMilk();
    let coffeeMachineCoffee = coffeeMachine.getCoffee();

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

function pourCoffeeAndMilk() { //Calls milk pour animation
    setTimeout(function() {
        coffee.classList.add('pour');
        milk.classList.add('pour');

        smallStartBtn.style.backgroundColor = 'rgb(255, 202, 87)';
    }, 1000);
}

function removePourCoffeeAndMilk() { //Prevents from call milk pour animation
    setTimeout(function() {
        coffee.classList.remove('pour');
        milk.classList.remove('pour');
        smallStartBtn.style.backgroundColor = '#777';
        enableTakeCoffee();
    }, 8000);
}

function makeEspresso() {
    let coffeeMachineWater = coffeeMachine.getWater();
    let coffeeMachineMilk = coffeeMachine.getMilk();
    let coffeeMachineCoffee = coffeeMachine.getCoffee();

    disableStartButton();
    pourCoffee();
    removePourCoffee();

    setTimeout(function() {
        Cup.getCoffee().style.height = '40%';
    }, 2000);
    
    coffeeMachine.setWater(coffeeMachineWater -= espressoWater);
    showPercent(calc('water'), 'water');

    coffeeMachine.setMilk(coffeeMachineMilk -= espressoMilk);
    showPercent(calc('milk'), 'milk');

    coffeeMachine.setCoffee(coffeeMachineCoffee -= espressoCoffee);
    showPercent(calc('coffee'), 'coffee');
    
    console.log(coffeeMachine.getCoffee());
}

function makeLatte() {
    let coffeeMachineWater = coffeeMachine.getWater();
    let coffeeMachineMilk = coffeeMachine.getMilk();
    let coffeeMachineCoffee = coffeeMachine.getCoffee();

    disableStartButton();
    pourCoffeeAndMilk();
    removePourCoffeeAndMilk();

    setTimeout(function() {
        Cup.getCoffee().style.height = '20%';
        Cup.getMilk().style.height = '85%';
        Cup.getFoam().style.height = '95%';
    }, 2000);

    coffeeMachine.setWater(coffeeMachineWater -= latteWater);
    showPercent(calc('water'), 'water');

    coffeeMachine.setMilk(coffeeMachineMilk -= latteMilk);
    showPercent(calc('milk'), 'milk');

    coffeeMachine.setCoffee(coffeeMachineCoffee -= latteCoffee);
    showPercent(calc('coffee'), 'coffee');

    console.log(coffeeMachine.getCoffee());
}

function makeAmericano() {
    let coffeeMachineWater = coffeeMachine.getWater();
    let coffeeMachineMilk = coffeeMachine.getMilk();
    let coffeeMachineCoffee = coffeeMachine.getCoffee();

    disableStartButton();
    pourCoffee();
    removePourCoffee();

    setTimeout(function() {
        Cup.getCoffee().style.height = '95%';
    }, 2000);

    coffeeMachine.setWater(coffeeMachineWater -= americanoWater);
    showPercent(calc('water'), 'water');

    coffeeMachine.setMilk(coffeeMachineMilk -= americanoMilk);
    showPercent(calc('milk'), 'milk');

    coffeeMachine.setCoffee(coffeeMachineCoffee -= americanoCoffee);
    showPercent(calc('coffee'), 'coffee');

    console.log(coffeeMachine.getCoffee());
}

function makeCappuccino() {
    let coffeeMachineWater = coffeeMachine.getWater();
    let coffeeMachineMilk = coffeeMachine.getMilk();
    let coffeeMachineCoffee = coffeeMachine.getCoffee();

    disableStartButton();
    pourCoffeeAndMilk();
    removePourCoffeeAndMilk();

    setTimeout(function() {
        Cup.getCoffee().style.height = '30%';
        Cup.getMilk().style.height = '65%';
        Cup.getFoam().style.height = '95%';
    }, 2000);

    coffeeMachine.setWater(coffeeMachineWater -= cappuccinoWater);
    showPercent(calc('water'), 'water');

    coffeeMachine.setMilk(coffeeMachineMilk -= cappuccinoMilk);
    showPercent(calc('milk'), 'milk');

    coffeeMachine.setCoffee(coffeeMachineCoffee -= cappuccinoCoffee);
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
    arrowIcon.classList.toggle('show');
});

popup.closeModalIcon.addEventListener('click', showModal);

refillTanks.addEventListener('click', showModal);

popup.addCoffeeIcon.addEventListener('click', function() {
    let coffeeMachineDefaultCoffee = coffeeMachine.getDefaultCoffee();

    coffeeMachine.setCoffee(coffeeMachineDefaultCoffee);
    coffeeQuantity.textContent = `${coffeeMachine.getCoffee()}/`;
    showPercent(calc('coffee'), 'coffee');
    resetAlertTextContent();
});

popup.addMilkIcon.addEventListener('click', function() {
    let coffeeMachineDefaultMilk = coffeeMachine.getDefaultMilk();
    
    coffeeMachine.setMilk(coffeeMachineDefaultMilk);
    milkQuantity.textContent = `${coffeeMachine.getDefaultMilk()}/`;
    showPercent(calc('milk'), 'milk');
    resetAlertTextContent();
});

popup.addWaterIcon.addEventListener('click', function() {
    let coffeeMachineDefaultWater = coffeeMachine.getDefaultWater();

    coffeeMachine.setWater(coffeeMachineDefaultWater);
    waterQuantity.textContent = `${coffeeMachine.getWater()}/`;
    showPercent(calc('water'), 'water');
    resetAlertTextContent();
});

showAside.addEventListener('click', function() {
    aside.classList.toggle('show');
});