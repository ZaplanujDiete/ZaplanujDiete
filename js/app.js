import { checkName } from "./saveName.js";
if (!checkName) window.location.replace("./app.html");
const hamburgerIcon = document.querySelector(".hamburger__menu");
const columnMenu = document.querySelector(".column__menu");

hamburgerIcon.addEventListener('click', () => {
    console.log('click');
    columnMenu.classList.toggle('show__menu');
})