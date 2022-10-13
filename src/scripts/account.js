import { Storage } from "./storage.js";

const makedCoffee = document.getElementById('maked-coffee');
const createdCustomCoffee = document.getElementById('custom-coffee-created');
const favoriteCoffee = document.getElementById('favorite-coffee-type');

makedCoffee.textContent = Storage.getItem('makedCoffee');
createdCustomCoffee.textContent = Storage.getItem('createdCustomCoffee');
favoriteCoffee.textContent = Storage.getItem('favoriteCoffee');

function selectElement(type, selector, callback) {
    document.addEventListener(type, (event) => {
        if (event.target.closest(selector)) {
            callback(event);
        }
    });
}

selectElement('click', '#main-menu-icon', (event) => {
    document.querySelector('.menu-aside').classList.toggle('show');
});

selectElement('click', '#reset-statistics-btn', (event) => {
    Storage.removeItem('makedCoffee');
    Storage.removeItem('createdCustomCoffee');
    Storage.removeItem('favoriteCoffee');
    Storage.removeItem('espressoType');
    Storage.removeItem('latteType');
    Storage.removeItem('americanoType');
    Storage.removeItem('cappuccinoType');

    makedCoffee.textContent = 0;
    createdCustomCoffee.textContent = 0;
    favoriteCoffee.textContent = 'none';
});

// selectElement('click', '#delete-account', (event) => {
//     localStorage.clear();
// });

selectElement('click', '#change-account-button', (event) => {
    const editButton = document.getElementById('change-account-button');
    const displayAccount = document.getElementById('account-display');

    displayAccount.value = "name";

    if (editButton.textContent.toLocaleLowerCase() === 'edit') {
        displayAccount.disabled = false;
        displayAccount.removeAttribute('readonly');
        displayAccount.focus();
        editButton.textContent = 'Save';
    }
    else {
        displayAccount.setAttribute('readonly', 'readonly');
        displayAccount.disabled = true;
        editButton.textContent = 'Edit';
    }
});
