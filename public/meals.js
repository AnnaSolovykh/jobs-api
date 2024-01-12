import {
    inputEnabled,
    setDiv,
    message,
    setToken,
    token,
    enableInput,
  } from "./index.js";
  import { showLoginRegister } from "./loginRegister.js";
  import { showAddEdit } from "./addEdit.js";
  
  let mealsDiv = null;
  let mealsTable = null;
  let mealsTableHeader = null;
  
  export const handleMeals = () => {
    mealsDiv = document.getElementById("meals");
    const logoff = document.getElementById("logoff");
    const addMeal = document.getElementById("add-meal");
    mealsTable = document.getElementById("meals-table");
    mealsTableHeader = document.getElementById("meals-table-header");
  
    mealsDiv.addEventListener("click", (e) => {
      if (inputEnabled && e.target.nodeName === "BUTTON") {
        if (e.target === addMeal) {
          showAddEdit(null);
        } else if (e.target === logoff) {
          showLoginRegister();
        }
      }
    });
  };
  
  export const showMeals = async () => {
    setDiv(mealsDiv);
  };