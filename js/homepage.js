const hamburger = document.querySelector(".hamburger__menu");
const hamburgerMenu = document.querySelector(".menu__list__mobile");
window.onscroll = function () { myFunction() };

const navbar = document.querySelector(".nav");

const sticky = navbar.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}
hamburger.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('class-display');
})