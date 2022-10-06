export class Aside {
    static get showMenu() {
        const showMenu = document.getElementById('show-menu');
        return showMenu;
    }

    static get refillTanks() {
        const refillTanks = document.getElementById('refill-tanks');
        return refillTanks;
    }

    static get mugIcon() {
        const mugIcon = document.getElementById('create-coffee');
        return mugIcon;
    }
}