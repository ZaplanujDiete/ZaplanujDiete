import { checkName } from "./saveName.js";
if (!checkName) window.location.replace("/app.html");
const schedulesListColumn = document.querySelector(".column__schedules__list");
const addScheduleColumn = document.querySelector(".column__schedules");
const schedulesList = document.querySelector(".schedules__list__list");
const saveEditButton = document.querySelector(".save__button");
const allRecipes = JSON.parse(window.localStorage.getItem('Recipes'));
let allPlans = JSON.parse(window.localStorage.getItem('Plans'));


class Schedules {

    addSchedulesButton = null;
    showAddColumn = null;
    options = null;
    numberOfPlan = 0;
    selectedPlan = null;

    planName = null;
    descriptionPlan = null;
    numberOfWeek = null;

    breakfasts = null;
    secondBreakfasts = null;
    soups = null;
    dinners = null;
    suppers = null;

    breakfastsArr = [];
    secondBreakfastsArr = [];
    soupsArr = [];
    dinnersArr = [];
    suppersArr = [];

    Plan = {};

    UiSelectors = {

        planName: '.add__schedule__name__input',
        descriptionPlan: '.add__schedule__desc__input',
        numberOfWeek: '.add__schedule__week__input',

        addSchedulesButton: '.add__schedule__button',
        showAddColumn: '#add__shedule__button',

        options: '.meal',

        breakfasts: '.breakfasts',
        secondBreakfasts: '.second__breakfasts',
        soups: '.soups',
        dinners: '.dinners',
        suppers: '.suppers',
    }

    initializeApp() {
        this.planName = document.querySelector(this.UiSelectors.planName);
        this.descriptionPlan = document.querySelector(this.UiSelectors.descriptionPlan);
        this.numberOfWeek = document.querySelector(this.UiSelectors.numberOfWeek);

        this.addSchedulesButton = document.querySelector(this.UiSelectors.addSchedulesButton);
        this.showAddColumn = document.querySelector(this.UiSelectors.showAddColumn);

        this.options = document.querySelectorAll(this.UiSelectors.options);

        this.breakfasts = document.querySelectorAll(this.UiSelectors.breakfasts);
        this.secondBreakfasts = document.querySelectorAll(this.UiSelectors.secondBreakfasts);
        this.soups = document.querySelectorAll(this.UiSelectors.soups);
        this.dinners = document.querySelectorAll(this.UiSelectors.dinners);
        this.suppers = document.querySelectorAll(this.UiSelectors.suppers);

        this.addEventListeners();

    }
    addEventListeners() {
        window.addEventListener('load', () => {
            this.loadPlanList();
        })
        this.showAddColumn.addEventListener('click', () => {
            schedulesListColumn.style.display = "none";
            addScheduleColumn.style.display = "block";
            this.showOptions()
        })

        this.addSchedulesButton.addEventListener('click', () => {
            this.getPlanName();
            this.getPlanDescription();
            this.getPlanWeekNumber();
            this.getAllMeals();
            this.saveNewPlan(this.Plan);
            location.reload();
        })
        schedulesList.addEventListener('click', (e) => {
            this.schedulesListHandler(e.target);
        })
        saveEditButton.addEventListener('click', () => {
            this.saveEditedPlan();
        })
    }
    loadPlanList() {
        if (allPlans) {
            const items = [...allPlans];
            items.forEach((el) => {
                this.numberOfPlan++;
                el.id = this.numberOfPlan;
                schedulesList.insertAdjacentHTML('beforeend', this.createElementPlansList(el.id, el.name, el.description, el.week));
            })
            allPlans = items;
            localStorage.setItem('Plans', JSON.stringify(allPlans));
        }
        return

    }
    createElementPlansList(id, namePlan, descriptionPlan, weekNumber) {
        return `
        <li id="${id}">
        <p class="order">
            ${id}
        </p>
        <p class="name">
            ${namePlan}
        </p>
        <p class="description">
            ${descriptionPlan}
        </p>
        <p class="week">
            ${weekNumber}
        </p>
        <p class="action">
            <i class="far fa-edit edit__plan"></i>
            <i class="far fa-trash-alt delete__plan"></i>
        </p>
    </li>
    `
    }
    schedulesListHandler(target) {
        if (target.classList.contains('edit__plan')) {
            this.editPlan(target);
        }
        else if (target.classList.contains('delete__plan')) {
            this.deletePlan(target);
        }
    }
    editPlan(target) {
        const { element, id } = this.getPlanListElement(target);
        schedulesListColumn.style.display = "none";
        addScheduleColumn.style.display = "block";
        this.addSchedulesButton.style.display = "none";
        saveEditButton.style.display = "block";
        const items = [...allPlans];
        items.forEach((plan) => {
            if (id === plan.id) {
                this.planName.value = plan.name;
                this.descriptionPlan.value = plan.description;
                this.numberOfWeek.value = plan.week;
                this.showOptions();
                this.breakfasts.forEach((select, numberOfSelect) => {
                    plan.breakfasts.forEach((meal, numberOfMeal) => {
                        if (numberOfSelect === numberOfMeal) {
                            select.value = meal;
                        }
                    })
                })
                this.secondBreakfasts.forEach((select, numberOfSelect) => {
                    plan.secondBreakfasts.forEach((meal, numberOfMeal) => {
                        if (numberOfSelect === numberOfMeal) {
                            select.value = meal;
                        }
                    })
                })
                this.dinners.forEach((select, numberOfSelect) => {
                    plan.dinners.forEach((meal, numberOfMeal) => {
                        if (numberOfSelect === numberOfMeal) {
                            select.value = meal;
                        }
                    })
                })
                this.soups.forEach((select, numberOfSelect) => {
                    plan.soups.forEach((meal, numberOfMeal) => {
                        if (numberOfSelect === numberOfMeal) {
                            select.value = meal;
                        }
                    })
                })
                this.suppers.forEach((select, numberOfSelect) => {
                    plan.suppers.forEach((meal, numberOfMeal) => {
                        if (numberOfSelect === numberOfMeal) {
                            select.value = meal;
                        }
                    })
                })
                this.selectedPlan = plan.id;
            }
        })

    }
    saveEditedPlan() {
        const items = [...allPlans];
        items.forEach((el) => {
            if (el.id === this.selectedPlan) {
                el.name = this.planName.value;
                el.description = this.descriptionPlan.value;
                el.week = this.numberOfWeek.value;
                this.getAllMeals();
                el.breakfasts = this.breakfastsArr;
                el.secondBreakfasts = this.secondBreakfastsArr;
                el.dinners = this.dinnersArr;
                el.soups = this.soupsArr;
                el.suppers = this.soupsArr;
            }
            allPlans = items;
            localStorage.setItem('Plans', JSON.stringify(allPlans));
            location.reload();
        })
    }
    deletePlan(target) {
        const { element, id } = this.getPlanListElement(target);
        const items = [...allPlans];
        items.forEach((el) => {
            if (el.id === id) {
                items.splice(el.id - 1, 1);
            }
        })
        allPlans = items;
        element.remove();
        localStorage.setItem('Plans', JSON.stringify(allPlans));
        location.reload();
    }
    getPlanListElement(target) {
        const listElement = target.parentElement.parentElement;
        const listElementId = parseInt(listElement.id);

        return {
            element: listElement,
            id: listElementId
        }
    }
    showOptions() {
        this.options.forEach(select => {

            allRecipes.forEach(option => {
                select.insertAdjacentHTML("beforeend", this.createOption(option.id, option.name));
            })
        })
    }
    createOption(id, nameMeal) {
        return `
        <option id="${id}" value="${nameMeal}">
        ${nameMeal}
        </option>
        `
    }
    getPlanName() {
        const planName = this.planName.value;

        if (planName) {
            this.Plan.name = planName;
        }
    }
    getPlanDescription() {
        const planDescription = this.descriptionPlan.value;

        if (planDescription) {
            this.Plan.description = planDescription;
        }
    }
    getPlanWeekNumber() {
        const week = this.numberOfWeek.value;

        if (week) {
            this.Plan.week = week;
        }
    }
    getAllMeals() {
        this.breakfasts.forEach(el => {
            this.breakfastsArr.push(el.value);
        })
        this.secondBreakfasts.forEach(el => {
            this.secondBreakfastsArr.push(el.value);
        })
        this.soups.forEach(el => {
            this.soupsArr.push(el.value);
        })
        this.dinners.forEach(el => {
            this.dinnersArr.push(el.value);
        })
        this.suppers.forEach(el => {
            this.suppersArr.push(el.value);
        })
        this.Plan.breakfasts = this.breakfastsArr;
        this.Plan.secondBreakfasts = this.secondBreakfastsArr;
        this.Plan.soups = this.soupsArr;
        this.Plan.dinners = this.dinnersArr;
        this.Plan.suppers = this.suppersArr;
    }
    saveNewPlan(obj) {

        let localData = [];
        if (localStorage.getItem('Plans') !== null) {
            localData = JSON.parse((window.localStorage.getItem('Plans')));
            localData.push(obj);
            localStorage.setItem('Plans', JSON.stringify(localData));
        }
        else {
            localData.push(obj);
            localStorage.setItem('Plans', JSON.stringify(localData));
        }
    }

}

const app = new Schedules();
app.initializeApp();

export default {
    Schedules,
}
