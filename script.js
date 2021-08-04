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
    let countryElement = document.querySelector("#country");
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
      let countryElement = document.querySelector("#country");
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
