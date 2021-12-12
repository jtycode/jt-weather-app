function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = `Hello, ${response.data.name}!`;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#realFeel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#currentHigh").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#currentLow").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let units = "imperial";
  let apiKey = "84f4278481c3a4f1198c0854406849af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSearchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

function searchGeolocation(position) {
  let apiKey = "84f4278481c3a4f1198c0854406849af";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchGeolocation);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSearchCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", searchCurrentLocation);

searchCity("Tokyo");

function formatTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `last updated: ${hours}:${minutes}`;
}
let timeElement = document.querySelector("#currentTime");
let currentTime = new Date();
timeElement.innerHTML = formatTime(currentTime);

function formatDate(date) {
  let dayIndex = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let currentDay = days[dayIndex];
  let monthIndex = date.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentMonth = months[monthIndex];
  let currentDate = date.getDate();
  return `${currentDay}., ${currentMonth}. ${currentDate}`;
}
let dateElement = document.querySelector("#currentDate");
let currentDate = new Date();
dateElement.innerHTML = formatDate(currentDate);

function convertToCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  let temp = tempElement.innerHTML;
  temp = Number(temp);
  tempElement.innerHTML = Math.round(((temp - 32) * 5) / 9);
}
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  let temp = tempElement.innerHTML;
  temp = Number(temp);
  tempElement.innerHTML = Math.round((temp * 9) / 5 + 32);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
