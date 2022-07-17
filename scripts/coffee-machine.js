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
let power = false;

function switchOn() {
    setTimeout(function() {
        if (!power) {
            power = true;
            startButton.disabled = false;
            espressoButton.disabled = false;
            latteButton.disabled = false;
            americanoButton.disabled = false;
            cappuccinoButton.disabled = false;
            text.style.backgroundColor = "#BBE2F3";
            powerButton.style.color = "#018AC8";
            startButton.style.color = "#018AC8";
            smallPowerBtn.style.backgroundColor = "rgb(20, 204, 20)";
        }
        else {
            power = false;
            startButton.disabled = true;
            espressoButton.disabled = true;
            latteButton.disabled = true;
            americanoButton.disabled = true;
            cappuccinoButton.disabled = true;
            text.value = "";
            text.style.backgroundColor = null;
            powerButton.style.color = "#aaa";
            startButton.style.color = "#aaa";
            smallPowerBtn.style.backgroundColor = "rgb(255, 61, 61)";
        }
    }, 1000);
}

function chooseType() {
    switch(text.value) {
        case "espresso":
            makeEspresso();
            break;
        case "latte":
            makeLatte();
            break;
        case "americano":
            makeAmericano();
            break;
        case "cappuccino":
            makeCappuccino();
            break;
        default:
            console.log('musisz wybrać typ');
    }
}

function makeEspresso() {
    setTimeout(function() {
        coffee.classList.add('pour');
        smallStartBtn.style.backgroundColor = "rgb(255, 202, 87)";
    }, 1000);
    
    setTimeout(function() {
        coffee.classList.remove('pour');
        smallStartBtn.style.backgroundColor = '#777';
    }, 8000);

    setTimeout(function() {
        cupCoffee.style.height = "30%";
    }, 2000);
}

function makeLatte() {
    setTimeout(function() {
        coffee.classList.add('pour');
        milk.classList.add('pour');

        smallStartBtn.style.backgroundColor = "rgb(255, 202, 87)";
    }, 1000);
    
    setTimeout(function() {
        coffee.classList.remove('pour');
        milk.classList.remove('pour');

        smallStartBtn.style.backgroundColor = '#777';
    }, 8000);

    setTimeout(function() {
        cupCoffee.style.height = "20%";
        cupMilk.style.height = "70%";
        cupFoam.style.height = "80%";
    }, 2000);
}

function makeAmericano() {
    setTimeout(function() {
        coffee.classList.add('pour');
        smallStartBtn.style.backgroundColor = "rgb(255, 202, 87)";
    }, 1000);
    
    setTimeout(function() {
        coffee.classList.remove('pour');
        smallStartBtn.style.backgroundColor = '#777';
    }, 8000);

    setTimeout(function() {
        cupCoffee.style.height = "80%";
    }, 2000);
}

function makeCappuccino() {
    setTimeout(function() {
        coffee.classList.add('pour');
        milk.classList.add('pour');

        smallStartBtn.style.backgroundColor = "rgb(255, 202, 87)";
    }, 1000);
    
    setTimeout(function() {
        coffee.classList.remove('pour');
        milk.classList.remove('pour');

        smallStartBtn.style.backgroundColor = '#777';
    }, 8000);

    setTimeout(function() {
        cupCoffee.style.height = "20%";
        cupMilk.style.height = "50%";
        cupFoam.style.height = "80%";
    }, 2000);
}


startButton.addEventListener('click', function() {
    chooseType();
});

powerButton.addEventListener('click', function() {
    switchOn();
});

espressoButton.addEventListener('click', function() {
    text.value = "espresso";
});

latteButton.addEventListener('click', function() {
    text.value = "latte";
});

americanoButton.addEventListener('click', function() {
    text.value = "americano";
});

cappuccinoButton.addEventListener('click', function() {
    text.value = "cappuccino";
});


