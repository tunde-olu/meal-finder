import fetchSingleMeal from "./meal.js";

const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  // random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading");
// const single_mealEl = document.getElementById("single-meal");

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();
  // Clear single meal
  //   single_mealEl.innerHTML = "";
  // Get search value
  const term = search.value;
  if (term.trim()) {
    const data = fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    )
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<p>Search results for '${term}'</p>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There is no search result for '${term}'. Search for another meal!</p>`;
        } else {
          const mealText = data.meals
            .map((meal) => {
              return `
            <a href="./meal.html" ><div class="meal"  data-id="${meal.idMeal}">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info">
            <h3>${meal.strMeal}</h3>
            </div>
            </div></a>
            `;
            })
            .join("");
          mealsEl.innerHTML = mealText;
        }
      });
    search.value = "";
  } else {
    alert(`Please enter a search value`);
  }
}
// Meal info page
function singlePagelLoad(e) {
  //   e.preventDefault();
  const mealID =
    e.target.parentElement.dataset.id ||
    e.target.parentElement.parentElement.dataset.id;
  localStorage.setItem("meal", mealID);
  console.log(mealID);
}
// getRandomMeal
// function getRandomMeal(e) {
//   //   e.preventDefault();
//   fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
//     .then((res) => res.json())
//     .then((data) => {
//       const meal = data.meals[0];
//       const randomID = meal.idMeal;

//       localStorage.setItem("randomID", randomID);
//       localStorage.clear();
//       console.log(randomID);
//     });
// }

function loadMeal() {
  const alpha = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const randomAlpha = alpha[Math.floor(Math.random() * alpha.length)];

  let data = fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${randomAlpha}`
  )
    .then((res) => res.json())
    .then((data) => {
      const mealText = data.meals
        .map((meal) => {
          return `
            <a href="./meal.html" ><div class="meal"  data-id="${meal.idMeal}">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info">
            <h3>${meal.strMeal}</h3>
            </div>
            </div></a>
            `;
        })
        .join("");
      mealsEl.innerHTML = mealText;
    })
    .catch((error) => window.location.reload());
}
// Event Listener
window.addEventListener("DOMContentLoaded", loadMeal);
submit.addEventListener("submit", searchMeal);
mealsEl.addEventListener("click", singlePagelLoad);
// random.addEventListener("click", singlePagelLoad);
