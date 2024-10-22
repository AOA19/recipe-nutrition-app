import nutritionApiKey from "./apiKey.js";

const apiKey = nutritionApiKey.API_KEY;

document.querySelector("#recipeBtn").addEventListener("click", getRecipe);

function getRecipe() {
  const mealInput = document.querySelector("#mealInput").value;
  // const recipeSection = document.querySelector("recipe-section");
  const mealName = document.querySelector("#mealName");
  const mealImg = document.querySelector("#mealImg");
  const ingredients = document.querySelector("#ingredients");
  const measurements = document.querySelector("#measurements");
  const instructions = document.querySelector("#instructions");
  const nutrition = document.querySelector("#nutrition");

  // Recipe API
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput}`)
    .then((response) => response.json())
    .then((mealData) => {
      // console.log(mealData);
      if (mealData.meals) {
        mealData.meals.forEach((recipe) => {
          mealName.innerText = recipe.strMeal;
          mealImg.src = recipe.strMealThumb;
          mealImg.alt = recipe.strMeal;
          instructions.innerText = recipe.strInstructions;

          for (let key in recipe) {
            // Display the ingredients
            if (key.startsWith("strIngredient") && recipe[key]) {
              // Create li element for ingredients list
              const ingredientsList = document.createElement("li");
              ingredientsList.innerText = recipe[key];

              ingredients.appendChild(ingredientsList);
            }
            // Display the measurements
            if (key.startsWith("strMeasure") && recipe[key].trim()) {
              // Create li element for measurements list
              const measurementsList = document.createElement("li");
              measurementsList.innerText = recipe[key];
              measurements.appendChild(measurementsList);
            }
          }
          // Nutrution API
          fetch(
            `https://api.api-ninjas.com/v1/nutrition?query=${recipe.strMeal}`,
            {
              method: "GET",
              headers: {
                "X-Api-Key": apiKey,
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((nutritionData) => {
              // console.log(nutritionData);

              // Display nutrition
              // Create element for total fat
              const totalFat = document.createElement("li");
              totalFat.innerText = `Total Fat: ${nutritionData[0].fat_total_g}g`;
              // Create element for saturated fat
              const saturatedFat = document.createElement("li");
              saturatedFat.innerText = ` Saturated Fat: ${nutritionData[0].fat_saturated_g}g`;
              // Create element for sodium
              const sodium = document.createElement("li");
              sodium.innerText = `Sodium: ${nutritionData[0].sodium_mg}mg`;
              // Create element for potassium
              const potassium = document.createElement("li");
              potassium.innerText = `Potassium: ${nutritionData[0].potassium_mg}mg`;
              // Create element for cholesterol
              const cholesterol = document.createElement("li");
              cholesterol.innerText = `Cholesteral: ${nutritionData[0].cholesterol_mg}mg`;
              // Create element for carbohydrates
              const carbohydrates = document.createElement("li");
              carbohydrates.innerText = `Carbohydrates: ${nutritionData[0].carbohydrates_total_g}g`;
              // Create element for fiber
              const fiber = document.createElement("li");
              fiber.innerText = `Fiber: ${nutritionData[0].fiber_g}g`;
              // Create element for sugar
              const sugar = document.createElement("li");
              sugar.innerText = `Sugar: ${nutritionData[0].sugar_g}g`;

              // Append to nutrition ul
              nutrition.append(
                totalFat,
                saturatedFat,
                sodium,
                potassium,
                cholesterol,
                carbohydrates,
                fiber,
                sugar
              );
            })

            // error for nutrition api
            .catch((err) => {
              console.log(`error ${err}`);
            });
        });
      } else {
        console.log("No meals found");
      }
    })
    // Error for recipe api
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
