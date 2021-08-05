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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> ${Math.round(
                    forecastDay.temp.max
                  )}° </span>
                  <span class="weather-forecast-temperature-min">  ${Math.round(
                    forecastDay.temp.min
                  )}° </span>
                </div>
                <div class="humidity"> <span class="humidity-icon"><i class="fas fa-tint"></i></span> <span id="hum1">${
                  forecastDay.humidity
                }%</span></div>
                </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "39875ec258d45cbbcd00f2745b4d9588";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

    currentTemperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    weatherTextElement.innerHTML = response.data.weather[0].description;
    currenthumidityElement.innerHTML = `${response.data.main.humidity} %`;

    getForecast(response.data.coord);
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
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );

      currentTemperatureElement.innerHTML = Math.round(response.data.main.temp);
      cityElement.innerHTML = response.data.name;
      weatherTextElement.innerHTML = response.data.weather[0].description;
      currenthumidityElement.innerHTML = `${response.data.main.humidity} %`;
      getForecast(response.data.coord);
    }

    axios.get(weatherUrl).then(displayWeather);
  }

  navigator.geolocation.getCurrentPosition(getCoordinates);
}

let currentWeather = document.querySelector("#current-city");
currentWeather.addEventListener("click", showWeather);
