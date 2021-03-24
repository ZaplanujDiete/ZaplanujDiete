const inputName = document.querySelector("#get__name");
const submitName = document.querySelector("#submit__name");
const showName = document.querySelector(".user__name");
const welcomeColumn = document.querySelector("#welcome");
const dashboardColumn = document.querySelector(".column__dashboard");
const error = document.querySelector(".error__info");

export const checkName = function () {
    return localStorage.getItem("name") ? localStorage.getItem('name') : false;
}()

const welcome = window.addEventListener('load', (e) => {
    const name = checkName;

    if (name) {
        showName.innerHTML = name;
        if (welcomeColumn) {
            welcomeColumn.style.display = "none";
            dashboardColumn.style.display = "block";
        }
        else return;

    }
    else if (welcomeColumn) {
        welcomeColumn.style.display = "block";
        dashboardColumn.style.display = "none";
    }

    submitName.addEventListener("click", () => {
        if (inputName.value) {
            showName.innerHTML = inputName.value;
            window.localStorage.setItem('name', showName.innerHTML);
            location.reload();
        }
        else {
            error.style.display = "block";
        }
    })
})

export default {
    welcome,
};