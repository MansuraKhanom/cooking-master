// Reading the seach input and showing them on the console bar
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {
    const searchInput = document.getElementById("search").value;
    const foodName = document.getElementById("food-name");

    // Eleminating null string value
    if (searchInput !== "") {
        const fetchData = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`).then(
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
        ).catch(err => foodName.innerText = err)

    } else {
        foodName.innerText = "Please enter a valid input!";
    }

})
