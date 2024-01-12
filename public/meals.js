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
import { deleteMeal } from "./addEdit.js";

let mealsDiv = null;
let mealsTable = null;
let mealsTableHeader = null;
  
export const handleMeals = () => {
  mealsDiv = document.getElementById("meals");
  const logoff = document.getElementById("logoff");
  const addMeal = document.getElementById("add-meal");
  mealsTable = document.getElementById("meals-table");
  mealsTableHeader = document.getElementById("meals-table-header");
  
  mealsDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
    if (e.target === addMeal) {
        showAddEdit(null);
      } else if (e.target.classList.contains("editButton")) {
        message.textContent = "";
        showAddEdit(e.target.dataset.id);
      } else if (e.target.classList.contains("deleteButton")) {
        message.textContent = "";
        deleteMeal(e.target.dataset.id);
      } else if (e.target === logoff) {
        setToken(null);
        message.textContent = "You have been logged off.";
        mealsTable.replaceChildren([mealsTableHeader]);
        showLoginRegister();
      } 
    }
  });
};

export const showMeals = async () => {
  try {
    enableInput(false);

    const response = await fetch("/api/v1/meals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    let children = [mealsTableHeader];

    if (response.status === 200) {
      if (data.count === 0) {
        mealsTable.replaceChildren(...children); 
      } else {
        for (let i = 0; i < data.meals.length; i++) {
          let rowEntry = document.createElement("tr");

          let editButton = `<td><button type="button" class="editButton" data-id=${data.meals[i]._id}>edit</button></td>`;
          let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.meals[i]._id}>delete</button></td>`;
          let favoriteCheckbox = `<td><input type="checkbox" ${data.meals[i].isFavorite ? 'checked' : ''} disabled></td>`;

          let rowHTML = `
            <td>${data.meals[i].title}</td>
            <td>${data.meals[i].type}</td>
            <div>${favoriteCheckbox}</div>
            <div>${editButton}${deleteButton}</div>`;

          rowEntry.innerHTML = rowHTML;
          children.push(rowEntry);
        }
        mealsTable.replaceChildren(...children);
      }  
    } else {
      message.textContent = data.msg;
    }
  } catch (err) {
    console.log(err);
    message.textContent = "A communication error occurred.";
  }
  enableInput(true);
  setDiv(mealsDiv);
} 