// Reading the seach input and showing them on the console bar
const searchBtn = document.getElementById("searchBtn");

// Creating fetchHandler function to reuse it multiple times
function fetchHandler(url) {
    const fetchData = fetch(url).then(
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
                let meals = data.meals;
                meals.forEach(meal => {
                    // Meal added as card list item
                    const card = document.createElement("li");
                    const cardBody = `
                        <div class="card" style="width: 18rem;">
                            <img src=${meal.strMealThumb} class="card-img-top"
                                alt="">
                            <div class="card-body">
                                <h5 class="card-title">${meal.strMeal}</h5>
                            </div>
                        </div>`;
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
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
        fetchHandler(url);
    } else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
        fetchHandler(url);
    }
})
