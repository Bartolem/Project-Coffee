import { Storage } from "./storage.js";

const makedCoffee = document.getElementById('maked-coffee');
const createdCustomCoffee = document.getElementById('custom-coffee-created');
const favoriteCoffee = document.getElementById('favorite-coffee-type');
const displayAccount = document.getElementById('account-display');

displayAccount.value = Storage.getItem('accountName');

function displayStatistics() {
    makedCoffee.textContent = checkStorage('makedCoffee', makedCoffee.textContent);
    createdCustomCoffee.textContent = checkStorage('createdCustomCoffee', createdCustomCoffee.textContent);
    favoriteCoffee.textContent = checkStorage('favoriteCoffee', favoriteCoffee.textContent);
}

function checkStorage(item, element) {
    if (Storage.getItem(item) === null) {
        element = 0;
    }

    else {
        element = Storage.getItem(item);
    }

    return element;
}

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

    displayStatistics();
});

selectElement('click', '#delete-account-btn', (event) => {
    localStorage.clear();
    displayAccount.value = '';

    displayStatistics();
});

selectElement('click', '#change-account-button', (event) => {
    const editButton = document.getElementById('change-account-button');

    Storage.setItem('accountName', displayAccount.value);

    if (editButton.textContent.toLocaleLowerCase() === 'change account name') {
        displayAccount.disabled = false;
        displayAccount.removeAttribute('readonly');
        displayAccount.focus();
        editButton.textContent = 'Save';
    }
    else {
        displayAccount.setAttribute('readonly', 'readonly');
        displayAccount.disabled = true;
        editButton.textContent = 'Change account name';
    }
});

displayStatistics();