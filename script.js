// Reading the seach input and showing them on the console bar
const searchBtn = document.getElementById("searchBtn");
var foodName;

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
                // console.log(data);
                foodName.innerText = data.meals[0].strMeal;
            } else {
                throw "No results found!";
            }
        },
        rej => { throw "No results found!"; }
    ).catch(err => foodName.innerText = err);
}

searchBtn.addEventListener("click", function () {
    const searchInput = document.getElementById("search").value;
    const oldCard = document.getElementById("card-div");
    if (oldCard !== null) {
        oldCard.remove();
    }
    // created dynamic card
    const cardDiv = document.createElement("div");
    cardDiv.id = "card-div";
    const cardTitle = `<h4 id="food-name"></h4>`;
    cardDiv.innerHTML = cardTitle;
    document.body.appendChild(cardDiv);

    foodName = document.getElementById("food-name");

    // Eleminating null string value
    if (searchInput === "") {
        foodName.innerText = "Please enter a valid input!";
    } else if (searchInput.length === 1) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
        fetchHandler(url);
    } else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
        fetchHandler(url);
    }
})
