export class Cup {
    static get coffee() {
        const coffee = document.querySelector('.cup-coffee');
        return coffee;
    }

    static get milk() {
        const milk = document.querySelector('.cup-milk');
        return milk;
    }

    static get foam() {
        const foam =  document.querySelector('.cup-foam');
        return foam;
    }
}