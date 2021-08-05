//Current Time
let today = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];

let hour = today.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${hour} : ${minutes}`;

//Display Forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/50d@2x.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> 18° </span>
                  <span class="weather-forecast-temperature-min"> 12° </span>
                </div>
                <div class="humidity"> <span class="humidity-icon"><i class="fas fa-tint"></i></span> <span id="hum1">19%</span></div>
                </div>
          `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Current Weather All Cities

function searchWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let apiKey = "39875ec258d45cbbcd00f2745b4d9588";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&APPID=${apiKey}&&units=metric`;

  function displayWeather(response) {
    let currentTemperatureElement = document.querySelector(
      "#currentTemperature"
    );
    let cityElement = document.querySelector("#city");
    let weatherTextElement = document.querySelector("#weatherText");
    let currenthumidityElement = document.querySelector("#hum0");

    let icon = document.querySelector("#icon");
    icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

    currentTemperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    countryElement.innerHTML = `, ${response.data.sys.country}`;
    weatherTextElement.innerHTML = response.data.weather[0].description;
    currenthumidityElement.innerHTML = `${response.data.main.humidity} %`;
  }

  axios.get(weatherUrl).then(displayWeather);
}

let cityWeather = document.querySelector("#enter-city");
cityWeather.addEventListener("click", searchWeather);

//Current Weather Current City

function showWeather(event) {
  event.preventDefault();
  function getCoordinates(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    let apiKey = `39875ec258d45cbbcd00f2745b4d9588`;
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

    function displayWeather(response) {
      let currentTemperatureElement = document.querySelector(
        "#currentTemperature"
      );

      let cityElement = document.querySelector("#city");
      let weatherTextElement = document.querySelector("#weatherText");
      let currenthumidityElement = document.querySelector("#hum0");
      let icon = document.querySelector("#icon");
      icon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );

      currentTemperatureElement.innerHTML = Math.round(response.data.main.temp);
      cityElement.innerHTML = response.data.name;
      countryElement.innerHTML = `, ${response.data.sys.country}`;
      weatherTextElement.innerHTML = response.data.weather[0].description;
      currenthumidityElement.innerHTML = `${response.data.main.humidity} %`;
    }

    axios.get(weatherUrl).then(displayWeather);
  }

  navigator.geolocation.getCurrentPosition(getCoordinates);
}

let currentWeather = document.querySelector("#current-city");
currentWeather.addEventListener("click", showWeather);

displayForecast();
