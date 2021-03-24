import { checkName } from "./saveName.js";
if (!checkName) window.location.replace("./app.html");
const columnListRecipe = document.querySelector(".column__recipes__list");
const addRecipeColumn = document.querySelector(".add__recipe__wrapper");
const addRecipeButton = document.querySelector("#add__recipe");
const recipesList = document.querySelector(".recipe__list__list");
const saveEditButton = document.querySelector(".save__button");
let allRecipes = [];
if (localStorage.getItem('Recipes') !== null) {
    allRecipes = JSON.parse(localStorage.getItem('Recipes'));
}


class AddRecipe {

    numberOfRecipe = 0;

    saveRecipeButton = null;
    nameRecipeInput = null;
    descriptionRecipeInput = null;

    addInstructionsInput = null;
    addIngredientsInput = null;

    addInstructionsBtn = null;
    addIngredientsBtn = null;

    insructionsList = null;
    ingredientsList = null;

    errorInstruction = null;
    errorIngredient = null;

    editedInstruction = null;
    editedIngredient = null;

    numberOfInstruction = 0;
    numberOfIngredient = 0;

    instructionsArr = [];
    ingredientsArr = [];

    Recipe = {};
    selectedRecipe = null;

    UiSelectors = {
        saveRecipeButton: '[data-save-recipe-btn]',
        nameRecipeInput: '.add__recipe__name__input',
        descriptionRecipeInput: '.add__recipe__desc__input',
        addInstructionsInput: '.instructions__text__input',
        addIngredientsInput: '.ingredients__text__input',
        addInstructionsBtn: '.instructions__text__btn',
        addIngredientsBtn: '.ingredients__text__btn',
        insructionsList: '.instructions__list__steps',
        ingredientsList: '.ingredients__list__steps',
        instructionText: '.instruction__text',
        ingredientText: '.ingredient__text',
        errorInstruction: '.error__instruction',
        errorIngredient: '.error__ingredient',
        editedIngredient: '.error',
    }

    initializeApp() {
        this.saveRecipeButton = document.querySelector(this.UiSelectors.saveRecipeButton);
        this.nameRecipeInput = document.querySelector(this.UiSelectors.nameRecipeInput);
        this.descriptionRecipeInput = document.querySelector(this.UiSelectors.descriptionRecipeInput);
        this.addInstructionsInput = document.querySelector(this.UiSelectors.addInstructionsInput);
        this.addIngredientsInput = document.querySelector(this.UiSelectors.addIngredientsInput);
        this.addInstructionsBtn = document.querySelector(this.UiSelectors.addInstructionsBtn);
        this.addIngredientsBtn = document.querySelector(this.UiSelectors.addIngredientsBtn);
        this.insructionsList = document.querySelector(this.UiSelectors.insructionsList);
        this.ingredientsList = document.querySelector(this.UiSelectors.ingredientsList);
        this.deleteInstructionBtn = document.querySelector(this.UiSelectors.deleteInstructionBtn);
        this.errorInstruction = document.querySelector(this.UiSelectors.errorInstruction);
        this.errorIngredient = document.querySelector(this.UiSelectors.errorIngredient);

        this.addEventListeners();

    }
    addEventListeners() {
        window.addEventListener('load', () => {
            this.loadRecipesList();
        })
        this.addInstructionsBtn.addEventListener('click', () => {
            this.addInstruction();
        })
        this.addIngredientsBtn.addEventListener('click', () => {
            this.addIngredient();

        })
        this.addInstructionsInput.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                this.addInstruction();
            }
        })
        this.addIngredientsInput.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                this.addIngredient();
            }
        })
        this.insructionsList.addEventListener('click', (e) => {
            this.instructionsListHandler(e.target);
        })
        this.ingredientsList.addEventListener('click', (e) => {
            this.ingredientsListHandler(e.target);
        })
        this.saveRecipeButton.addEventListener('click', () => {
            this.getNewRecipe();
            this.saveNewRecipe(this.Recipe);
            location.reload();
        })

        recipesList.addEventListener('click', (e) => {
            this.recipesListHandler(e.target);


        })
        saveEditButton.addEventListener('click', () => {
            this.saveEditedRecipe();
        })
    }
    loadRecipesList() {
        if (allRecipes.length !== null) {
            const items = [...allRecipes];
            items.forEach((el) => {
                const nameRecipe = el.name;
                const description = el.description;
                this.numberOfRecipe++;
                el.id = this.numberOfRecipe;
                const numberElement = this.numberOfRecipe;
                const id = this.numberOfRecipe;
                recipesList.insertAdjacentHTML('beforeend', this.createElementRecipesList(id, numberElement, nameRecipe, description));
            })
            allRecipes = items;
            localStorage.setItem('Recipes', JSON.stringify(allRecipes));
        }
        return

    }
    createElementRecipesList(id, numberElement, nameRecipe, description) {
        return `
        <li id="${id}">
        <p class="order">
            ${numberElement}
        </p>
        <p class="name">
            ${nameRecipe}
        </p>
        <p class="description">
            ${description}
        </p>
        <p class="action">
            <i class="far fa-edit edit__recipe"></i>
            <i class="far fa-trash-alt delete__recipe"></i>
        </p>
    </li>
    `
    }
    recipesListHandler(target) {
        if (target.classList.contains('edit__recipe')) {
            this.editRecipe(target);
        }
        else if (target.classList.contains('delete__recipe')) {
            this.deleteRecipe(target);
        }
    }
    editRecipe(target) {
        const { element, id } = this.getRecipeListElement(target);
        columnListRecipe.style.display = "none";
        addRecipeColumn.style.display = "block";
        this.saveRecipeButton.style.display = "none";
        saveEditButton.style.display = "block";
        const items = [...allRecipes];
        items.forEach((el) => {
            if (id === el.id) {
                this.nameRecipeInput.value = el.name;
                this.descriptionRecipeInput.value = el.description;
                el.instructions.forEach(el => {
                    this.insructionsList.insertAdjacentHTML('beforeend', this.createInstructionElement(el.id, el.instruction));
                });
                el.ingredients.forEach(el => {
                    this.ingredientsList.insertAdjacentHTML('beforeend', this.createIngredientElement(el.id, el.ingredient));
                });

                this.instructionsArr = el.instructions;
                this.numberOfInstruction = this.instructionsArr.length;
                this.ingredientsArr = el.ingredients;
                this.numberOfIngredient = this.ingredientsArr.length;
                this.selectedRecipe = el.id;
            }
        })

    }

    saveEditedRecipe() {
        const items = [...allRecipes];
        items.forEach((el) => {
            if (el.id === this.selectedRecipe) {
                console.log(el);
                el.name = this.nameRecipeInput.value;
                el.description = this.descriptionRecipeInput.value;
                el.instructions = this.instructionsArr;
                el.ingredients = this.ingredientsArr;
            }
            allRecipes = items;
            localStorage.setItem('Recipes', JSON.stringify(allRecipes));
            location.reload();
        })
    }
    deleteRecipe(target) {
        const { element, id } = this.getRecipeListElement(target);
        const items = [...allRecipes];
        items.forEach((el) => {
            if (el.id === id) {
                items.splice(el.id - 1, 1);
            }
        })
        allRecipes = items;
        element.remove();
        localStorage.setItem('Recipes', JSON.stringify(allRecipes));
        location.reload();
    }
    getRecipeListElement(target) {
        const listElement = target.parentElement.parentElement;
        const listElementId = parseInt(listElement.id);

        return {
            element: listElement,
            id: listElementId
        }
    }
    getNewRecipe() {
        if (allRecipes === null) {
            this.Recipe.id = 1;
        }
        else {
            this.Recipe.id = allRecipes.length + 1;
        }
        this.getName();
        this.getDescription();
        this.Recipe.instructions = this.instructionsArr;
        this.Recipe.ingredients = this.ingredientsArr;
    }
    saveNewRecipe(obj) {

        let localData = [];
        if (localStorage.getItem('Recipes') !== null) {
            localData = JSON.parse((window.localStorage.getItem('Recipes')));
            localData.push(obj);
            localStorage.setItem('Recipes', JSON.stringify(localData));
        }
        else {
            localData.push(obj);
            localStorage.setItem('Recipes', JSON.stringify(localData));
        }
    }
    getName() {
        const name = this.nameRecipeInput.value;

        if (name) {
            this.Recipe.name = name;
        }
        return null;
    }
    getDescription() {
        const description = this.descriptionRecipeInput.value;

        if (description) {
            this.Recipe.description = description;
        }
        return null;
    }
    addInstruction() {
        const newInstruction = this.getInstructionValue();
        if (!newInstruction) {
            this.showErrorInstruction();
        }
        if (this.editedInstruction) {
            this.updateInstruction();
            this.addInstructionsInput.value = '';
            return this.editedInstruction = null;
        }

        this.instructionsArr.push(newInstruction);

        this.insructionsList.insertAdjacentHTML('beforeend', this.createInstructionElement(newInstruction.id, newInstruction.instruction));

        this.numberOfInstruction++;
        this.addInstructionsInput.value = '';
    }
    createInstructionElement(id, instruction) {
        return `
        <li id="${id}" class="instruction__step"><span class="instruction__text">${instruction}</span>
        <i class="fa fa-edit edit__instruction"></i>
        <i class="fa fa-trash-alt delete__instruction"></i>
        </li>
        `
    }
    addIngredient() {
        const newIngredient = this.getIngredientValue();
        if (!newIngredient) {
            this.showErrorIngredient();
        }
        if (this.editedIngredient) {
            this.updateIngredient();
            this.addIngredientsInput.value = '';
            return this.editedIngredient = null;
        }

        this.ingredientsArr.push(newIngredient);

        this.ingredientsList.insertAdjacentHTML('beforeend', this.createIngredientElement(newIngredient.id, newIngredient.ingredient));

        this.numberOfIngredient++;
        this.addIngredientsInput.value = '';
    }
    createIngredientElement(id, ingredient) {
        return `
        <li id="${id}" class="ingredient__step"><span class="ingredient__text">${ingredient}</span>
        <i class="fa fa-edit edit__ingredient"></i>
        <i class="fa fa-trash-alt delete__ingredient"></i>
        </li>
        `
    }
    getInstructionValue() {
        const instruction = this.addInstructionsInput.value;

        if (instruction) {
            return {
                id: this.editedInstruction ? this.editedInstruction.id : `${this.numberOfInstruction}`,
                instruction
            }
        }
        return null;
    }
    getIngredientValue() {
        const ingredient = this.addIngredientsInput.value;

        if (ingredient) {
            return {
                id: this.editedIngredient ? this.editedIngredient.id : `${this.numberOfIngredient}`,
                ingredient
            }
        }
        return null;
    }
    instructionsListHandler(target) {
        if (target.classList.contains('edit__instruction')) {
            this.editInstruction(target);
        }
        if (target.classList.contains('delete__instruction')) {
            this.deleteInstruction(target);
        }
    }
    ingredientsListHandler(target) {
        if (target.classList.contains('edit__ingredient')) {
            this.editIngredient(target);
        }
        if (target.classList.contains('delete__ingredient')) {
            this.deleteIngredient(target);
        }
    }
    deleteInstruction(target) {
        const { element, id } = this.getListElement(target);
        const items = [...this.instructionsArr];
        this.instructionsArr = items.filter(item => item.id !== id);

        element.remove();
    }
    deleteIngredient(target) {
        const { element, id } = this.getListElement(target);
        const items = [...this.ingredientsArr];
        this.ingredientsArr = items.filter(item => item.id !== id);

        element.remove();
    }
    editInstruction(target) {
        const { element, id } = this.getListElement(target);
        this.editedInstruction = element;
        const selectedInstruction = this.instructionsArr.find(item => item.id === id);

        this.addInstructionsInput.value = selectedInstruction.instruction;

        this.updateInstruction();
    }
    updateInstruction() {
        const items = [...this.instructionsArr];
        items.forEach(item => {
            if (item.id === this.editedInstruction.id) {
                item.instruction = this.addInstructionsInput.value;
                this.instructionsArr = items;
                this.editedInstruction.querySelector(this.UiSelectors.instructionText).textContent = item.instruction;

            }
            else {
                return;
            }
        })
    }
    editIngredient(target) {
        const { element, id } = this.getListElement(target);
        this.editedIngredient = element;
        const selectedIngredient = this.ingredientsArr.find(item => item.id === id);

        this.addIngredientsInput.value = selectedIngredient.ingredient;

        this.updateIngredient();
    }
    updateIngredient() {
        const items = [...this.ingredientsArr];
        items.forEach(item => {
            if (item.id === this.editedIngredient.id) {
                item.ingredient = this.addIngredientsInput.value;
                this.ingredientsArr = items;
                this.editedIngredient.querySelector(this.UiSelectors.ingredientText).textContent = item.ingredient;
            }
            else {
                return;
            }
        })
    }
    getListElement(target) {
        const listElement = target.parentElement;
        const listElementId = listElement.id;

        return {
            element: listElement,
            id: listElementId
        }
    }
    showErrorInstruction() {
        this.errorInstruction.classList.remove('hide')
    }
    hideErrorInstruction() {
        this.errorInstruction.classList.add('hide')
    }
    showErrorIngredient() {
        this.errorIngredient.classList.remove('hide')
    }
    hideErrorIngredient() {
        this.errorIngredient.classList.add('hide')
    }
}

const app = new AddRecipe();
app.initializeApp();

addRecipeButton.addEventListener("click", () => {
    columnListRecipe.style.display = "none";
    addRecipeColumn.style.display = "block";
})
export default {
    AddRecipe,
}