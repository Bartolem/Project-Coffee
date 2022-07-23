let cupCoffee = document.querySelector('.cup-coffee');
let cupMilk = document.querySelector('.cup-milk');
let cupFoam = document.querySelector('.cup-foam');
let milk = document.querySelector('.milk');
let coffee = document.querySelector('.coffee');
let startButton = document.querySelector('.start');
let powerButton = document.querySelector('.power');
let smallPowerBtn = document.querySelector('.small-btn-power');
let smallStartBtn = document.querySelector('.small-btn-start');
let espressoButton = document.querySelector('.espresso-btn');
let latteButton = document.querySelector('.latte-btn');
let americanoButton = document.querySelector('.americano-btn');
let cappuccinoButton = document.querySelector('.cappuccino-btn');
let text = document.querySelector('#output-text');
let cup = document.querySelector('.cup');
let takeCoffee = document.querySelector('.base button:nth-child(1)');
let takeCup = document.querySelector('.base button:nth-child(2)');
let power = false;

const coffeeMachine = {
    water: 6000, 
    milk: 1000,
    coffee: 1000,
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
    setTimeout(function() {
        if (!power) {
            power = true;
            startButton.disabled = false;
            espressoButton.disabled = false;
            latteButton.disabled = false;
            americanoButton.disabled = false;
            cappuccinoButton.disabled = false;
            text.style.backgroundColor = '#BBE2F3';
            powerButton.style.color = '#018AC8';
            startButton.style.color = '#018AC8';
            smallPowerBtn.style.backgroundColor = 'rgb(20, 204, 20)';
        }
        else {
            power = false;
            startButton.disabled = true;
            espressoButton.disabled = true;
            latteButton.disabled = true;
            americanoButton.disabled = true;
            cappuccinoButton.disabled = true;
            text.value = '';
            text.style.backgroundColor = null;
            powerButton.style.color = '#aaa';
            startButton.style.color = '#aaa';
            smallPowerBtn.style.backgroundColor = 'rgb(255, 61, 61)';
        }
    }, 1000);
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
            console.log('musisz wybrać typ');
    }
}

function disableStartButton() {
    startButton.disabled = true;
}

function enableStartButton() {
    startButton.disabled = false;
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

function makeEspresso() {
    disableStartButton();

    setTimeout(function() {
        coffee.classList.add('pour');
        smallStartBtn.style.backgroundColor = 'rgb(255, 202, 87)';
    }, 1000);
    
    setTimeout(function() {
        coffee.classList.remove('pour');
        smallStartBtn.style.backgroundColor = '#777';
        enableTakeCoffee();
    }, 8000);

    setTimeout(function() {
        cupCoffee.style.height = '20%';
    }, 2000);

    coffeeMachine.water -= espresso.water;
    console.log('water ' + coffeeMachine.water);

    coffeeMachine.milk -= espresso.milk;
    console.log('milk ' + espresso.milk);

    coffeeMachine.coffee -= espresso.coffee;
    console.log('coffee ' + coffeeMachine.coffee);
}

function makeLatte() {
    disableStartButton();

    setTimeout(function() {
        coffee.classList.add('pour');
        milk.classList.add('pour');

        smallStartBtn.style.backgroundColor = 'rgb(255, 202, 87)';
    }, 1000);
    
    setTimeout(function() {
        coffee.classList.remove('pour');
        milk.classList.remove('pour');
        smallStartBtn.style.backgroundColor = '#777';
        enableTakeCoffee();
    }, 8000);

    setTimeout(function() {
        cupCoffee.style.height = '30%';
        cupMilk.style.height = '85%';
        cupFoam.style.height = '95%';
    }, 2000);

    coffeeMachine.water -= latte.water;
    console.log('water ' + coffeeMachine.water);

    coffeeMachine.milk -= latte.milk;
    console.log('milk ' + coffeeMachine.milk);

    coffeeMachine.coffee -= latte.coffee;
    console.log('coffee ' + coffeeMachine.coffee);
}

function makeAmericano() {
    disableStartButton();

    setTimeout(function() {
        coffee.classList.add('pour');
        smallStartBtn.style.backgroundColor = 'rgb(255, 202, 87)';
    }, 1000);
    
    setTimeout(function() {
        coffee.classList.remove('pour');
        smallStartBtn.style.backgroundColor = '#777';
        enableTakeCoffee();
    }, 8000);

    setTimeout(function() {
        cupCoffee.style.height = '80%';
    }, 2000);

    coffeeMachine.water -= americano.water;
    console.log('water ' + coffeeMachine.water);

    coffeeMachine.milk -= americano.milk;
    console.log('milk ' + coffeeMachine.milk);

    coffeeMachine.coffee -= americano.coffee;
    console.log('coffee ' + coffeeMachine.coffee);
}

function makeCappuccino() {
    disableStartButton();

    setTimeout(function() {
        coffee.classList.add('pour');
        milk.classList.add('pour');

        smallStartBtn.style.backgroundColor = 'rgb(255, 202, 87)';
    }, 1000);
    
    setTimeout(function() {
        coffee.classList.remove('pour');
        milk.classList.remove('pour');
        smallStartBtn.style.backgroundColor = '#777';
        enableTakeCoffee();
    }, 8000);

    setTimeout(function() {
        cupCoffee.style.height = '30%';
        cupMilk.style.height = '65%';
        cupFoam.style.height = '95%';
    }, 2000);

    coffeeMachine.water -= cappuccino.water;
    console.log('water ' + coffeeMachine.water);

    coffeeMachine.milk -= cappuccino.milk;
    console.log('milk ' + coffeeMachine.milk);

    coffeeMachine.coffee -= cappuccino.coffee;
    console.log('coffee ' + coffeeMachine.coffee);
}

function getCup() {
    cup.style.visibility = 'visible';
    cupCoffee.style.display = 'block';
    cupMilk.style.display = 'block';
    cupFoam.style.display = 'block';
    
    enableStartButton();
}

takeCup.addEventListener('click', function() {
    getCup();
    disableTakeCup();
});

takeCoffee.addEventListener('click', function() {
    cup.style.visibility = 'hidden';
    cupCoffee.style.display = 'none';
    cupCoffee.style.height = '0';
    cupMilk.style.display = 'none';
    cupMilk.style.height = '0';
    cupFoam.style.display = 'none';
    cupFoam.style.height = '0';

    disableTakeCoffee();
    enableTakeCup();
});

startButton.addEventListener('click', function() {
    chooseType();
});

powerButton.addEventListener('click', function() {
    switchOn();
});

espressoButton.addEventListener('click', function() {
    text.value = 'espresso';
});

latteButton.addEventListener('click', function() {
    text.value = 'latte';
});

americanoButton.addEventListener('click', function() {
    text.value = 'americano';
});

cappuccinoButton.addEventListener('click', function() {
    text.value = "cappuccino";
});


