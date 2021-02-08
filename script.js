
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", function () {
    const searchInput = document.getElementById("search").value;
    const foodName = document.getElementById("food-name");
    foodName.innerText = searchInput;

})
