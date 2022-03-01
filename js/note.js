const buttonSearch = () => {
  const searchField = document.getElementById("searchArea");
  const searchText = searchField.value;
  searchField.value = "";
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.data));
};

const displaySearchResult = (data) => {
  const searchResult = document.getElementById("allPhone");

  if (data.length == 0) {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card">
      <h2> your result bot found </h2>
  </div>`;
    searchResult.appendChild(div);
  }
  searchResult.innerHTML = "";
  data.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="col">
      <div class="card text-center">
        <img src="${phone.image}" class="card-img-top w-50" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <h6 class=""><strong>brand: ${phone.brand}</strong></h6>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button class="btn btn-primary" onclick="details('${phone.slug}')">Details</button>
          <button class="btn btn-danger">Danger</button>
        </div>
        
      </div>
    </div>`;
    searchResult.appendChild(div);
  });
};
const loadMealDetail = (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMEalDetails(data.meals[0]));
};

const displayMEalDetails = (meal) => {
  console.log(meal);
  const mealDetails = document.getElementById("meal-details");
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
  <img src="${meal.strMealThumb}" class="card-img-top"  style="width: 100%; alt="..." />
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">
    ${meal.strInstructions}
    </p>
    <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
  </div>
`;
  mealDetails.appendChild(div);
};
