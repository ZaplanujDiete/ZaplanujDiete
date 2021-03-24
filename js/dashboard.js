const addPlan = document.querySelector(".add__plan");
const addRecipe = document.querySelector(".add__recipe");
const nextPlan = document.querySelector(".switch__next");
const prevPlan = document.querySelector(".switch__prev")
const allRecipes = JSON.parse(window.localStorage.getItem('Recipes'));
const allPlans = JSON.parse(window.localStorage.getItem('Plans'));

class Dashboard {

    showAmountRecips = null;
    notificationsWrapper = null;
    showNumberWeek = null;

    breakfasts = null;
    secondBreakfasts = null;
    soups = null;
    dinners = null;
    suppers = null;

    numberOfPlan = 1;


    UiSelectors = {
        showAmountRecips: '.amount__recipes',
        notificationsWrapper: '.widgets__wrapper__notifications',
        showNumberWeek: '.number__plan',

        breakfasts: '.breakfast',
        secondBreakfasts: '.second__breakfast',
        soups: '.soup',
        dinners: '.dinner',
        suppers: '.supper',
    }

    initializeApp() {
        this.showAmountRecips = document.querySelector(this.UiSelectors.showAmountRecips);
        this.notificationsWrapper = document.querySelector(this.UiSelectors.notificationsWrapper);
        this.showNumberWeek = document.querySelector(this.UiSelectors.showNumberWeek);

        this.breakfasts = document.querySelectorAll(this.UiSelectors.breakfasts);
        this.secondBreakfasts = document.querySelectorAll(this.UiSelectors.secondBreakfasts);
        this.soups = document.querySelectorAll(this.UiSelectors.soups);
        this.dinners = document.querySelectorAll(this.UiSelectors.dinners);
        this.suppers = document.querySelectorAll(this.UiSelectors.suppers);

        this.addEventListeners();
    }
    addEventListeners() {
        window.addEventListener('load', () => {
            this.loadDashboard();
        })
        addPlan.addEventListener('click', () => {
            window.location.replace("/schedules.html");
        })
        addRecipe.addEventListener('click', () => {
            window.location.replace("/recipes.html");
        })

        this.notificationsWrapper.addEventListener('click', (e) => {
            this.notificationsListHandler(e.target);
        })
        prevPlan.addEventListener('click', () => {
            if (this.numberOfPlan > 1) {
                this.numberOfPlan--;
                this.loadPlan(this.numberOfPlan);
            }
            console.log(this.numberOfPlan);
        })
        nextPlan.addEventListener('click', () => {
            if (this.numberOfPlan < allPlans.length) {
                this.numberOfPlan++;
                this.loadPlan(this.numberOfPlan);
            }
            console.log(this.numberOfPlan);
        })
    }

    loadDashboard() {
        const recipesNotification = allRecipes.length;
        this.showAmountRecips.innerHTML = recipesNotification;
        this.loadPlan(this.numberOfPlan);
    }
    loadPlan(id) {
        const items = [...allPlans];
        items.forEach(plan => {
            if (id === plan.id) {
                this.showNumberWeek.innerHTML = plan.week;
                this.breakfasts.forEach((select, numberOfSelect) => {
                    plan.breakfasts.forEach((meal, numberOfMeal) => {
                        if (numberOfSelect === numberOfMeal) {
                            select.innerHTML = meal;
                        }
                    })
                })
                this.secondBreakfasts.forEach((select, numberOfSelect) => {
                    plan.secondBreakfasts.forEach((meal, numberOfMeal) => {
                        if (numberOfSelect === numberOfMeal) {
                            select.innerHTML = meal;
                        }
                    })
                })
                this.dinners.forEach((select, numberOfSelect) => {
                    plan.dinners.forEach((meal, numberOfMeal) => {
                        if (numberOfSelect === numberOfMeal) {
                            select.innerHTML = meal;
                        }
                    })
                })
                this.soups.forEach((select, numberOfSelect) => {
                    plan.soups.forEach((meal, numberOfMeal) => {
                        if (numberOfSelect === numberOfMeal) {
                            select.innerHTML = meal;
                        }
                    })
                })
                this.suppers.forEach((select, numberOfSelect) => {
                    plan.suppers.forEach((meal, numberOfMeal) => {
                        if (numberOfSelect === numberOfMeal) {
                            select.innerHTML = meal;
                        }
                    })
                })
            }
        })
    }
    notificationsListHandler(target) {
        if (target.classList.contains('close__recipes__info')) {
            this.deleteNotification(target);
        }
        else if (target.classList.contains('close__plan__info')) {
            this.deleteNotification(target);
        }
        else if (target.classList.contains('close__thanks__info')) {
            this.deleteNotification(target);
        }
    }
    getPlanListElement(target) {
        const listElement = target.parentElement;

        return {
            element: listElement,
        }
    }
    deleteNotification(target) {
        const { element } = this.getPlanListElement(target);
        element.style.display = 'none'
    }

}

const app = new Dashboard();
app.initializeApp();

export default {
    Dashboard,
}