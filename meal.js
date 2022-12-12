const single_mealEl = document.getElementById("single-meal");

function fetchSingleMeal(url) {
  const mealID = localStorage.getItem("meal");
  //   fetch(
  //     `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}` ||
  //       `https://www.themealdb.com/api/json/v1/1/random.php`
  //   )
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      document.title = meal.strMeal;
      //   console.log(meal);
      addMealToDOM(meal);
    });
}
// addMealToDOM
function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
        </div>
        <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>
            <ul>
            ${ingredients
      .map((ingredient) => `<li>${ingredient}</li>`)
      .join("")}
            </ul>
        </h2>
        </div>
    </div>
    `;
}

// window.addEventListener("DOMContentLoaded", fetchSingleMeal);
export default fetchSingleMeal;
