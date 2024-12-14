// * Global

const searcInput = document.getElementById("search");
const btnFind = document.getElementById("submit");
const loading = document.querySelector(".loading");

// ^ Start JS

(async () => {
  loading.classList.remove("d-none");
  await getWeatherData("Tanta");
  loading.classList.add("d-none");
})();

//Events

// prevent from default
document.querySelectorAll("form").forEach((items) => {
  items.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

searcInput.addEventListener("input", () => {
  let city = searcInput.value;
  getWeatherData(city);
});

btnFind.addEventListener("click", () => {
  let city = searcInput.value;
  getWeatherData(city);
});

// ! Function

// Get weather Data
async function getWeatherData(city) {
  const api = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=5560895c1b5d4edba11235232240912&q=${city}&days=7`
  );

  const response = await api.json();
  let weatherData = response;
  let currentDay = weatherData;
  const weekData = weatherData.forecast.forecastday;
  await displayCurrentDay(currentDay);
  displayWeekData(weekData);
}

// Display Current Day
function displayCurrentDay(weatherData) {
  const localTime = weatherData.location.localtime.split(" ")[0]; // استخراج التاريخ فقط
  const dayName = getDayName(localTime); // تحويل التاريخ إلى اسم يوم
  let currentDayData = `
       <div class="card py-4 px-md-5">
                <div
                  class="d-flex justify-content-center gap-5 align-items-center"
                >
                  <h4 class="h3 text-center">${dayName}</h4>
                  <span class="h3">/</span>
                  <span class="h6">${localTime}</span>
                </div>
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col-lg-7 mb-3 mb-lg-0">
                      <div class="ms-md-3">
                        <h3 class="card-title">${weatherData.location.name}</h3>
                        <div class="d-flex gap-3">
                          <h4 class="card-title h5">${weatherData.current.temp_c}°C</h4>
                          <img src="${weatherData.current.condition.icon}" alt="" />
                        </div>
                        <p class="card-text h4 main-color">${weatherData.current.condition.text}</p>
                      </div>
                    </div>
                    <div class="col-lg-5">
                      <div class="d-flex justify-content-between">
                        <div class="humidity d-flex gap-2 align-items-center">
                          <i class="fa-solid fa-droplet"></i>
                          <p class="d-flex flex-column m-0 text-center">
                            <span class="d-inline-block">humidity</span>
                            <span class="d-inline-block text-color">${weatherData.current.humidity}%</span>
                          </p>
                        </div>
                        <div class="humidity d-flex gap-2 align-items-center">
                          <i class="fa-solid fa-wind"></i>
                          <p class="d-flex flex-column m-0 text-center">
                            <span class="d-inline-block">Wind Speed</span>
                            <span class="d-inline-block text-color">${Math.floor(weatherData.current.wind_kph)} km/h</span>
                          </p>
                        </div>
                        <div class="humidity d-flex gap-2 align-items-center">
                          <i class="fa-solid fa-compass"></i>
                          <p class="d-flex flex-column m-0">
                            <span class="d-inline-block text-color">${weatherData.current.wind_dir}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
    `;

  document.getElementById("rowCurrentData").innerHTML = currentDayData;
}

// Display Week Data
function displayWeekData(weekData) {
  let cartona = "";

  for (let i = 1; i < weekData.length; i++) {
    const dayName = getDayName(weekData[i].date); // تحويل التاريخ إلى اسم يوم

    cartona += `
      <div class="card-info" >
        <div class="card">
                    <div
                      class="d-flex justify-content-center"
                    >
                      <h4 class="text-center">${dayName}</h4>
                    </div>
                    <div
                      class="card-body d-flex flex-column align-items-center"
                    >
                      <img src="${weekData[i].day.condition.icon}" alt="" />
                      <h4 class="card-title h5">MAX : ${weekData[i].day.maxtemp_c} °C</h4>
                      <p class="card-text text-color">MIN : ${weekData[i].day.mintemp_c} °C</p>
                      <p class="card-text text-color">AVG : ${weekData[i].day.avgtemp_c} °C</p>
                      <p class="card-text text-center main-color">
                        ${weekData[i].day.condition.text}
                      </p>
                    </div>
                  </div>
            </div>
                  
    `;
  }
  document.getElementById("weekData").innerHTML = cartona;
}

function getDayName(dateString) {
  // تحويل النص إلى كائن تاريخ
  const date = new Date(dateString);
  // استخراج اسم اليوم
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  return dayName; // مثل "Monday" أو "Tuesday"
}
