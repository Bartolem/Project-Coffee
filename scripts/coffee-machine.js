const cupCoffee = document.querySelector('.cup-coffee');
const cupMilk = document.querySelector('.cup-milk');
const cupFoam = document.querySelector('.cup-foam');

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

const milkInTank = document.querySelector('.milk-in-tank');
const waterInTank = document.querySelector('.water-in-tank');
const coffeeInTank = document.querySelector('.coffee-in-tank');

const displayPercentWater = document.querySelector('.water-percent');
const displayPercentMilk = document.querySelector('.milk-percent');
const displayPercentCoffee = document.querySelector('.coffee-percent');

const arrowIcon = document.querySelector('#arrow-icon');
const coffeeMenu = document.querySelector('.right-child');

let percentWater;
let percentMilk;
let percentCoffee;
let power = false;

const cupElements = [cupCoffee, cupMilk, cupFoam];
const coffeeButtons = [espressoButton, latteButton, americanoButton, cappuccinoButton];
const activeElements = [powerButton, text, displayPercentWater, displayPercentMilk, displayPercentCoffee];

const defaultCoffeeMachine = {
    water: 1750, 
    milk: 2400,
    coffee: 500,
    cup: 10
};

const coffeeMachine = {
    water: 1750, 
    milk: 2400,
    coffee: 500,
    cup: 10
};

const espresso = {
    water: 30, 
    milk: 0,
    coffee: 8,
    cup: 1
};

const latte = {
    water: 60, 
    milk: 300,
    coffee: 16,
    cup: 1
};

const americano = {
    water: 150, 
    milk: 0,
    coffee: 16,
    cup: 1
};

const cappuccino = {
    water: 60, 
    milk: 120,
    coffee: 16,
    cup: 1
};

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

function chooseType() {
    switch(text.value) {
        case 'espresso':
            if(coffeeMachine.coffee >= espresso.coffee
                && coffeeMachine.water >= espresso.water) {
                    makeEspresso();
            }
            else if (coffeeMachine.coffee < espresso.coffee) {
                console.log(`Not enought coffee beans to make espresso!`);
            }
            else if (coffeeMachine.water < espresso.water) {
                console.log(`Not enought water to make espresso!`);
            }
            break;
        case 'latte':
            if(coffeeMachine.coffee >= latte.coffee
                && coffeeMachine.water >= latte.water
                && coffeeMachine.milk >= latte.milk) {
                    makeLatte();
            }
            else if (coffeeMachine.coffee < latte.coffee) {
                console.log(`Not enought coffee beans to make latte!`);
            }
            else if (coffeeMachine.water < latte.water) {
                console.log(`Not enought water to make latte!`);
            }
            else if (coffeeMachine.milk < latte.milk) {
                console.log(`Not enought milk to make latte!`);
            }
            break;
        case 'americano':
            if(coffeeMachine.coffee >= americano.coffee
                && coffeeMachine.water >= americano.water) {
                    makeAmericano();
            }
            else if (coffeeMachine.coffee < americano.coffee) {
                console.log(`Not enought coffee beans to make americano!`);
            }
            else if (coffeeMachine.water < americano.water) {
                console.log(`Not enought water to make americano!`);
            }
            break;
        case 'cappuccino':
            if(coffeeMachine.coffee >= cappuccino.coffee
                && coffeeMachine.water >= cappuccino.water
                && coffeeMachine.milk >= cappuccino.milk) {
                    makeCappuccino();
            }
            else if (coffeeMachine.coffee < cappuccino.coffee) {
                console.log(`Not enought coffee beans to make cappuccino!`);
            }
            else if (coffeeMachine.water < cappuccino.water) {
                console.log(`Not enought water to make cappuccino!`);
            }
            else if (coffeeMachine.milk < cappuccino.milk) {
                console.log(`Not enought milk to make cappuccino!`);
            }
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

function showPercentWater() {
    displayPercentWater.innerHTML = `${percentWater}%`;
    waterInTank.style.height = `${percentWater}%`;
}

function showPercentMilk() {
    displayPercentMilk.innerHTML = `${percentMilk}%`;
    milkInTank.style.height = `${percentMilk}%`;
}

function showPercentCoffee() {
    displayPercentCoffee.innerHTML = `${percentCoffee}%`;
    coffeeInTank.style.height = `${percentCoffee}%`;
}

function calcPercentWater() {
    percentWater = Math.round(coffeeMachine.water / defaultCoffeeMachine.water * 100);
    console.log(`water ${percentWater}%`);
    showPercentWater();
}

function calcPercentMilk() {
    percentMilk = Math.round(coffeeMachine.milk / defaultCoffeeMachine.milk * 100);
    console.log(`milk ${percentMilk}%`);
    showPercentMilk();
}

function calcPercentCoffee() {
    percentCoffee = Math.round(coffeeMachine.coffee / defaultCoffeeMachine.coffee * 100);
    console.log(`coffee ${percentCoffee}%`);
    showPercentCoffee();
}

function pourCoffee() {
    setTimeout(function() {
        coffee.classList.add('pour');
        smallStartBtn.style.backgroundColor = 'rgb(255, 202, 87)';
    }, 1000);
}

function removePourCoffee() {
    setTimeout(function() {
        coffee.classList.remove('pour');
        smallStartBtn.style.backgroundColor = '#777';
        enableTakeCoffee();
    }, 8000);
}

function pourCoffeeAndMilk() {
    setTimeout(function() {
        coffee.classList.add('pour');
        milk.classList.add('pour');

        smallStartBtn.style.backgroundColor = 'rgb(255, 202, 87)';
    }, 1000);
}

function removePourCoffeeAndMilk() {
    setTimeout(function() {
        coffee.classList.remove('pour');
        milk.classList.remove('pour');
        smallStartBtn.style.backgroundColor = '#777';
        enableTakeCoffee();
    }, 8000);
}

function makeEspresso() {
    disableStartButton();
    pourCoffee();
    removePourCoffee();

    setTimeout(function() {
        cupCoffee.style.height = '40%';
    }, 2000);

    coffeeMachine.water -= espresso.water;
    calcPercentWater();

    coffeeMachine.milk -= espresso.milk;
    calcPercentMilk();

    coffeeMachine.coffee -= espresso.coffee;
    calcPercentCoffee();
}

function makeLatte() {
    disableStartButton();
    pourCoffeeAndMilk();
    removePourCoffeeAndMilk();

    setTimeout(function() {
        cupCoffee.style.height = '20%';
        cupMilk.style.height = '85%';
        cupFoam.style.height = '95%';
    }, 2000);

    coffeeMachine.water -= latte.water;
    calcPercentWater();

    coffeeMachine.milk -= latte.milk;
    calcPercentMilk();

    coffeeMachine.coffee -= latte.coffee;
    calcPercentCoffee();
}

function makeAmericano() {
    disableStartButton();
    pourCoffee();
    removePourCoffee();

    setTimeout(function() {
        cupCoffee.style.height = '95%';
    }, 2000);

    coffeeMachine.water -= americano.water;
    calcPercentWater();

    coffeeMachine.milk -= americano.milk;
    calcPercentMilk();

    coffeeMachine.coffee -= americano.coffee;
    calcPercentCoffee();
}

function makeCappuccino() {
    disableStartButton();
    pourCoffeeAndMilk();
    removePourCoffeeAndMilk();

    setTimeout(function() {
        cupCoffee.style.height = '30%';
        cupMilk.style.height = '65%';
        cupFoam.style.height = '95%';
    }, 2000);

    coffeeMachine.water -= cappuccino.water;
    calcPercentWater();

    coffeeMachine.milk -= cappuccino.milk;
    calcPercentMilk();

    coffeeMachine.coffee -= cappuccino.coffee;
    calcPercentCoffee();
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

arrowIcon.addEventListener('click', function() {
    coffeeMenu.classList.toggle('show');
    arrowIcon.classList.toggle('show');
});

