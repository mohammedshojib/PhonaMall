// <====! start here ====>

const buttonSearch = () => {
  const searchValue = document.getElementById("searchArea");
  const searchVal = searchValue.value;
  searchValue.value = "";
  const hello = document.getElementById("detailsContainer");
  hello.textContent = "";
  const parentDiv = document.getElementById("allPhone");
  parentDiv.textContent = "";

  // <====! Error Handeling (basics)  ====>
  if (searchVal == 0) {
    alert("please enter a phone name");
    const parentDiv = document.getElementById("allPhone");
    const div = document.createElement("div");

    div.innerHTML = `
        <div class="alert alert-danger" role="alert">
        please enter a correct Value!
    </div>`;
    parentDiv.appendChild(div);
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchVal}`;
    fetch(url)
      .then((res) => res.json())
      .then((myData) => showPhones(myData.data));
  }
};

// <====! showPhones (error handling)  ====>

const showPhones = (phones) => {
  if (phones.length === 0) {
    alert("please enter a phone name");
    const parentDiv = document.getElementById("allPhone");
    const div = document.createElement("div");

    div.innerHTML = `
        <div class="alert alert-danger" role="alert">
        please enter a correct device name!
    </div>`;
    parentDiv.appendChild(div);
  }
  // <===== Data filter =====>

  const firstTwintyData = phones.slice(0, 20);
  for (const phone of firstTwintyData) {
    const parentDiv = document.getElementById("allPhone");
    const div = document.createElement("div");

    div.innerHTML = `
    <div class="col">
      <div class="card text-center">
        <img src="${phone.image}" class="card-img-top w-50" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <h6 class=""><strong>brand: ${phone.brand}</strong></h6>
          <button class="btn btn-primary" onclick="details('${phone.slug}')">Details</button>
        </div>
        
      </div>
    </div>`;
    parentDiv.appendChild(div);
  }
};
// <====! Details   ====>

const details = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => detailsPopUp(data.data));
};
const detailsPopUp = (info) => {
  console.log(info);
  const hello = document.getElementById("detailsContainer");
  hello.textContent = "";
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="col">
      <div id="detailsContainer" class="card text-center">
        <img src="${
          info.image
        }" class="card-img-top" style="width: 50%;" alt="...">
        <div class="card-body">
          <h5 class="card-title">${info.name}</h5>
          <h6 class=""><strong>ChipSet: ${
            info.mainFeatures.chipSet || "Device Dosn't have ChipSet"
          }</strong></h6>
          <p class="card-text"><strong>Memory:- </strong>${
            info.mainFeatures.memory
          }
          </p>
          <p class="card-text">
          <strong>Futures</strong>
          <ul>
          <li>${info.mainFeatures.sensors[0]}</li>
          <li>${info.mainFeatures.sensors[1]}</li>
          <li>${info.mainFeatures.sensors[2]}</li>
          <li>${info.mainFeatures.sensors[3]}</li>
        </ul>
      </p>
          <p class="card-text"><strong>Releas Date:-</strong> ${
            info.releaseDate || " not found"
          }</p>
          <p class="card-text"><strong>"Others"</strong>
          <ul>
          <li>${info.others.WLAN}</li>
          <li>${info.others.Bluetooth}</li>
          <li>${info.others.GPS}</li>
          <li>${info.others.NFC}</li>
        </ul></p>
        
        </div>
        
      </div>
    </div>`;
  hello.appendChild(div);
};
