import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showMeals } from "./meals.js";

let addEditDiv = null;
let title = null;
let type = null;
let isFavorite = null;
let addingMeal = null;

export const handleAddEdit = () => {
    addEditDiv = document.getElementById("edit-meal");
    title = document.getElementById("title");
    type = document.getElementById("type");
    isFavorite = document.getElementById("isFavorite");
    addingMeal = document.getElementById("adding-meal");
    const editCancel = document.getElementById("edit-cancel");

    addEditDiv.addEventListener("click", (e) => {
        if (inputEnabled && e.target.nodeName === "BUTTON") {
            if (e.target === addingMeal) {
                showMeals();
            } else if (e.target === editCancel) {
                showMeals();
            }
        }
    });
};

export const showAddEdit = (job) => {
    message.textContent = "";
    setDiv(addEditDiv);
};