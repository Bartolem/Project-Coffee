export class Aside {
    static get showMenu() {
        const showMenu = document.querySelector('.action-icons div:first-child');
        return showMenu;
    }

    static get refillTanks() {
        const refillTanks = document.querySelector('.action-icons div:nth-child(2)');
        return refillTanks;
    }

    static get mugIcon() {
        const mugIcon = document.querySelector('.action-icons div:nth-child(3)');
        return mugIcon;
    }
}