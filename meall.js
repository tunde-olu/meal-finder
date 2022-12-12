import fetchSingleMeal from "./meal.js";

const single_mealEl = document.getElementById("single-meal");

const mealID = localStorage.getItem("meal");
fetchSingleMeal(
  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
);

window.addEventListener("DOMContentLoaded", fetchSingleMeal);
