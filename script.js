// Reading the seach input and showing them on the console bar
const searchBtn = document.getElementById("searchBtn");

// loading meal details
function mealDetails(element) {
    let mealDetailsDiv = document.getElementById("meal-details");

    // fetching meal details by id
    let mealId = element.getElementsByClassName("meal-id")[0].innerText;
    url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url).then(
        res => res.json()
    ).then(
        data => {
            let meal = data.meals[0];
            mealDetailsDiv.getElementsByClassName("card-img-top")[0].src = meal.strMealThumb;
            mealDetailsDiv.getElementsByClassName("card-title")[0].innerText = meal.strMeal;

            // filtering ingredients
            let ingredients = Object.keys(meal).filter(key => key.includes("strIngredient")).map(ingredientKey => meal[ingredientKey]).filter(ingredient => ingredient !== "");
            mealDetailsDiv.getElementsByClassName("card-text")[0].innerText = ingredients;
        }
    )

    mealDetailsDiv.style.display = "block"; // making meal details visible
}

// Creating fetchHandler function to reuse it multiple times
function fetchHandler(url) {
    fetch(url).then(
        res => {
            // Response validation and showing error message
            if (res.ok) {
                return res.json();
            } else {
                throw "No results found!";
            }
        },
        rej => { throw "No results found!"; }
    ).then(
        data => {
            // data validation and showing error message
            if (data.meals !== null) {
                meals = data.meals;
                meals.forEach(meal => {
                    // Meal added as card list item
                    const card = document.createElement("li");
                    // displaying meal details onclick anchor tag
                    const cardBody = `
                        <a href="#" onClick="mealDetails(this)">
                            <div class="card" style="width: 18rem;">
                                <img src=${meal.strMealThumb} class="card-img-top"
                                    alt="">
                                <div class="card-body">
                                    <p class="meal-id" style="display: none;">${meal.idMeal}</p>
                                    <h5 class="card-title">${meal.strMeal}</h5>
                                </div>
                            </div>
                        </a>`;
                    card.innerHTML = cardBody;
                    cardList.appendChild(card);
                });
            } else {
                throw "No results found!";
            }
        },
        rej => { throw "No results found!"; }
    ).catch(err => {
        let errorMsg = document.createElement("li");
        errorMsg.innerText = err;
        cardList.appendChild(errorMsg);
    });
}

searchBtn.addEventListener("click", function () {
    let mealDetailsDiv = document.getElementById("meal-details");
    mealDetailsDiv.style.display = "none";

    const searchInput = document.getElementById("search").value;
    const oldCardList = document.getElementById("card-list");
    // old card list deleted on every search
    if (oldCardList !== null) {
        oldCardList.remove();
    }
    // created dynamic card list
    cardList = document.createElement("ul");
    cardList.id = "card-list";
    document.body.appendChild(cardList);

    // Eleminating null string value
    if (searchInput === "") {
        let errorMsg = document.createElement("li");
        errorMsg.innerText = "Please enter a valid name or letter!";
        cardList.appendChild(errorMsg);
    } else if (searchInput.length === 1) {
        let url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
        fetchHandler(url);
    } else {
        let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
        fetchHandler(url);
    }
})
