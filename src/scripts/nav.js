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