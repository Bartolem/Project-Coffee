export class Popup {
    constructor() {
        this.modal = document.querySelector('.modal');
        this.modalWrap = document.querySelector('.modal-wrap');
        this.alert = document.querySelector('.alert');
        this.alertText = document.querySelector('.alert span');
        this.closeModalIcon =  document.querySelector('.modal-top i');
        this.addCoffeeIcon = document.querySelector('#add-coffee');
        this.addMilkIcon = document.querySelector('#add-milk');
        this.addWaterIcon = document.querySelector('#add-water');
    }
}

