let now = new Date();

let dateNow = document.querySelector("#date-now");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
let time = now.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

dateNow.innerHTML = `${day}, ${month} ${date}, ${year} at ${time}`;

function displayWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  let unitsFahrenheit = "°F";
  let percentage = "%";
  // let speed = "mi/h";

  let tempNowValue = document.querySelector("#temp-now");
  fahrenheitTemperature = response.data.main.temp;
  tempNowValue.innerHTML = Math.round(fahrenheitTemperature);

  let tempHighValue = document.querySelector("#temp-high-now");
  fahrenheitHighTemperature = response.data.main.temp_max;
  tempHighValue.innerHTML = `High: ${Math.round(fahrenheitHighTemperature)}°F`;

  let tempLowValue = document.querySelector("#temp-low-now");
  fahrenheitLowTemperature = response.data.main.temp_min;
  tempLowValue.innerHTML = `Low: ${Math.round(fahrenheitLowTemperature)}°F`;

  let humidity = Math.round(response.data.main.humidity);
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${humidity}${percentage}`;

  let windNow = document.querySelector("#wind");
  windSpeedImperial = response.data.wind.speed;
  windNow.innerHTML = `Windspeed: ${Math.round(windSpeedImperial)}mi/h`;

  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}
function displaySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let tempNowValue = document.querySelector("#temp-now");
  let celsiusTemperature = (fahrenheitTemperature - 32) * (5 / 9);
  tempNowValue.innerHTML = Math.round(celsiusTemperature);

  let tempHighValue = document.querySelector("#temp-high-now");
  let celsiusHighTemperature = (fahrenheitHighTemperature - 32) * (5 / 9);
  tempHighValue.innerHTML = `High: ${Math.round(celsiusHighTemperature)}°C`;

  let tempLowValue = document.querySelector("#temp-low-now");
  let celsiusLowTemperature = (fahrenheitLowTemperature - 32) * (5 / 9);
  tempLowValue.innerHTML = `Low: ${Math.round(celsiusLowTemperature)}°C`;

  let windNow = document.querySelector("#wind");
  let windSpeedMetric = windSpeedImperial * 1.609;
  windNow.innerHTML = `Windspeed: ${Math.round(windSpeedMetric)}km/h`;
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let tempNowValue = document.querySelector("temp-now");
  tempNowValue.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let form = document.querySelector("#city-country-form");
form.addEventListener("submit", displaySubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Tokyo");
