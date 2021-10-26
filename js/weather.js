// Feature 1
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
  let speed = "mi/h";
  console.log(response.data);

  let tempNowValue = Math.round(response.data.main.temp);
  document.querySelector(
    "#temp-now"
  ).innerHTML = `${tempNowValue}${unitsFahrenheit}`;

  let tempHighValue = Math.round(response.data.main.temp_max);
  document.querySelector(
    "#temp-high-now"
  ).innerHTML = `High: ${tempHighValue}${unitsFahrenheit}`;

  let tempLowValue = Math.round(response.data.main.temp_min);
  document.querySelector(
    "#temp-low-now"
  ).innerHTML = `Low: ${tempLowValue}${unitsFahrenheit}`;

  let humidity = Math.round(response.data.main.humidity);
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${humidity}${percentage}`;

  let windSpeed = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `Windspeed: ${windSpeed}${speed}`;

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

let form = document.querySelector("#city-country-form");
form.addEventListener("submit", displaySubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
// let currentLocationButton = document.querySelector("current-location-button");
// currentLocationButton.addEventListener("click", displayCurrentLocation);

searchCity("Tokyo");
