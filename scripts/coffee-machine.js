let milk = document.querySelector('.milk');
let coffee = document.querySelector('.coffee');
let button = document.querySelector('.start');

// const chooseType = function() {

// }

button.addEventListener('click', function() {
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


