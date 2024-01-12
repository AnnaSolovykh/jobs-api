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

    addEditDiv.addEventListener("click", async (e) => {
        if (inputEnabled && e.target.nodeName === "BUTTON") {
            if (e.target === addingMeal) {
                enableInput(false);
            
                let method = "POST";
                let url = "/api/v1/meals";

                if (addingMeal.textContent === "update") {
                    method = "PATCH";
                    url = `/api/v1/meals/${addEditDiv.dataset.id}`;
                }

                try {
                    const response = await fetch(url, {
                        method: method,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            title: title.value,
                            type: type.value,
                            isFavorite: isFavorite.checked,
                        }),
                    });
        
                    const data = await response.json();
                    if (response.status === 200 || response.status === 201) {
                        if (response.status === 200) {
                            message.textContent = "The meal entry was updated.";
                        } else {
                            message.textContent = "The meal entry was created.";
                        }
                
                        title.value = "";
                        type.value = "";
                        isFavorite.checked = false;
                
                        showMeals();
                    } else {
                        message.textContent = data.msg;
                    }
                } catch (err) {
                    console.log(err);
                    message.textContent = "A communication error occurred.";
                }
            
                enableInput(true);
            } else if (e.target === editCancel) {
                message.textContent = "";
                showMeals();
            }
        }
    });
};

export const showAddEdit = async (mealId) => {
    if (!mealId) {
        title.value = "";
        type.value = "";
        isFavorite.checked = false;
        addingMeal.textContent = "add";
        message.textContent = "";
    
        setDiv(addEditDiv);
    } else {
        enableInput(false);

        try {
            const response = await fetch(`/api/v1/meals/${mealId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            });
    
            const data = await response.json();
            if (response.status === 200) {
                title.value = data.meal.title;
                type.value = data.meal.type;
                isFavorite.checked = data.meal.isFavorite;
                addingMeal.textContent = "update";
                message.textContent = "";
                addEditDiv.dataset.id = mealId;
        
                setDiv(addEditDiv);
            } else {
                message.textContent = "The meals entry was not found";
                showMeals();
            }
        } catch (err) {
            console.log(err);
            message.textContent = "A communications error has occurred.";
            showMeals();
        }
    
        enableInput(true);
    }
};

export const deleteMeal = async (mealId) => {
    enableInput(false);
    try {
        const response = await fetch(`/api/v1/meals/${mealId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            message.textContent = "Meal successfully deleted.";
            showMeals();
        } else {
            const data = await response.json();
            message.textContent = data.msg;
        }
    } catch (err) {
        console.log(err);
        message.textContent = "A communication error occurred while deleting the meal.";
    }

    enableInput(true);
};