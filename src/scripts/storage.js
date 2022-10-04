export class Storage {
    static getItem(item) {
        return localStorage.getItem(item);
    }

    static setItem(item, value) {
        localStorage.setItem(item, value);
    }

    static checkStorage(item, value) {
        if (localStorage.getItem(item) === null) {
            Storage.setItem(item, value);
        }
    }
}