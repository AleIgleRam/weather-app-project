//Feature #1
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
    console.log(response.data);
    let currentTemperature = Math.round(response.data.main.temp);
    let city = response.data.name;
    let country = response.data.sys.country;
    let weatherText = response.data.weather[0].description;
    let currenthumidity = document.querySelector("#hum1");
    let humidity = response.data.main.humidity;
    currenthumidity.innerHTML = `${humidity} %`;
    let icon = document.querySelector("#icon");
    let image = icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${image} ${city}, ${country} ${currentTemperature} C° ${weatherText}`;
  }

  axios.get(weatherUrl).then(displayWeather);
}

let cityWeather = document.querySelector("#city-search");
cityWeather.addEventListener("submit", searchWeather);

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
      currentTemperatureElement.innerHTML = Math.round(response.data.main.temp);
      let cityElement = document.querySelector("#city");
      cityElement.innerHTML = response.data.name;
      let countryElement = document.querySelector("#country");
      countryElement.innerHTML = response.data.sys.country;
      let weatherText = response.data.weather[0].description;
      let currenthumidity = document.querySelector("#hum1");
      let humidity = response.data.main.humidity;
      currenthumidity.innerHTML = `${humidity} %`;
      let icon = document.querySelector("#icon");
      icon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      let h1 = document.querySelector("h1");
      h1.innerHTML = ` ${city}, ${country} ${currentTemperature} C° ${weatherText}`;
    }

    axios.get(weatherUrl).then(displayWeather);
  }

  navigator.geolocation.getCurrentPosition(getCoordinates);
}

let currentWeather = document.querySelector("#current-city");
currentWeather.addEventListener("click", showWeather);
