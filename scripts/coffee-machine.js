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
    }, 2000);
}

function chooseType() {
    switch(text.value) {
        case "espresso":
            makeCoffee();
            break;
        case "latte":
            break;
        case "americano":
            break;
        case "cappuccino":
            break;
        default:
            console.log('musisz wybrać typ');
    }
}

function makeCoffee() {
    setTimeout(function() {
        milk.classList.add('pour');
        smallStartBtn.style.backgroundColor = "rgb(255, 202, 87)";
    }, 2000);
    
    setTimeout(function() {
        milk.classList.remove('pour');
        smallStartBtn.style.backgroundColor = '#777';
    }, 8000);
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

  

// function pureMilk() {

// }

// function pureCoffee() {
//     function buttonClick() {
//         button.addEventListener('click', function() {
//             coffee.classList.add('pour');
        
//             setTimeout(function() {
//                 coffee.classList.remove('pour');
//             }, 8000);
//         });
//     }
// }


