let milk = document.querySelector('.milk');
let coffee = document.querySelector('.coffee');
let startButton = document.querySelector('.start');
let powerButton = document.querySelector('.power');
let smallPowerBtn = document.querySelector('.small-btn-power');
let espressoButton = document.querySelector('.espresso-btn');
let latteButton = document.querySelector('.latte-btn');
let americanoButton = document.querySelector('.americano-btn');
let cappuccinoButton = document.querySelector('.cappuccino-btn');
let text = document.querySelector('#output-text');

powerButton.addEventListener('click', function() {
    powerButton.style.color = "green";
    smallPowerBtn.style.backgroundColor = "green";
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

// const chooseType = function() {

// }

startButton.addEventListener('click', function() {
    milk.classList.add('pour');

    setTimeout(function() {
        milk.classList.remove('pour');
    }, 8000);
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


