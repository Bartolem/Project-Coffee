const mainMenuIcon = document.getElementById('main-menu-icon');

mainMenuIcon.addEventListener('click', function() {
    document.querySelector('.menu-aside').classList.toggle('show');
});