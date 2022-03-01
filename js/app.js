const buttonSearch = () => {
  const searchValue = document.getElementById("searchArea").value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;

  fetch(url)
    .then((res) => res.json())
    .then((myData) => showPhones(myData.data));
};

const showPhones = (phones) => {
  for (const phone of phones) {
    const parentDiv = document.getElementById("allPhone");
    const div = document.createElement("div");
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
    parentDiv.appendChild(div);
  }
};

const details = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => detailsPopUp(data.data));
};
const detailsPopUp = (info) => {
  console.log(info);
  const hello = document.getElementById("detailsContainer");
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="col">
      <div id="detailsContainer" class="card text-center">
        <img src="${info.image}" class="card-img-top" style="width: 50%;" alt="...">
        <div class="card-body">
          <h5 class="card-title">${info.name}</h5>
          <h6 class=""><strong>ChipSet: ${info.mainFeatures.chipSet}</strong></h6>
          <p class="card-text">${info.mainFeatures.memory}</p>
          <p class="card-text">${info.mainFeatures.sensors}</p>
        
        </div>
        
      </div>
    </div>`;
  hello.appendChild(div);
};
