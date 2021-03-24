const hamburgerIcon = document.querySelector(".hamburger__menu");
const columnMenu = document.querySelector(".column__menu");

hamburgerIcon.addEventListener('click', () => {
    console.log('click');
    columnMenu.classList.toggle('show__menu');
})