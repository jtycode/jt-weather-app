// Current details display
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = `Hello, ${response.data.name}!`;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#currentHigh").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#currentLow").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  fahrenheitTemperature = response.data.main.temp;
  // Current forecast icon
  let iconElement = document.querySelector("#currentForecastIcon");
  iconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  // forecast
  getForecast(response.data.coord);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
// Week Forecast
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row justify-content-md-center">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col col-md-2">
          <p class="forecastDay">
                ${formatDay(forecastDay.dt)}
              <div>
                <img 
                  src="images/${forecastDay.weather[0].icon}.png" 
                  alt="" 
                  id ="forecastIcon" 
                  width="50" />
              </div>
              <div class="forecastHigh"> ${Math.round(
                forecastDay.temp.max
              )}° </div>
              <div class="forecastLow"> ${Math.round(
                forecastDay.temp.min
              )}° </div>
          <p>
     </div>
  `;
    }
    highTemperature = forecastDay.temp.max;
    lowTemperature = forecastDay.temp.min;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "84f4278481c3a4f1198c0854406849af";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5`;
  let apiUrl = `${apiEndpoint}/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

// Search city engine
function searchCity(city) {
  let units = "imperial";
  let apiKey = "84f4278481c3a4f1198c0854406849af";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSearchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

// User current location (geolocation)
function searchGeolocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "imperial";
  let apiKey = "84f4278481c3a4f1198c0854406849af";
  let apiEndpoint = "https://api.openweather.map.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
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

// Time and Date
function formatTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `Last updated: ${hours}:${minutes}`;
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

// Celsius vs Fahrenheit conversion
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  // Convert forecast temperatures
  let highTempElement = document.querySelector("forecastHigh");
  let lowTempElement = document.quertSelector("forecastLow");
  highTempElement.innerHTML = Math.round(highTemperature);
  lowTempElement.innerHTML = Math.round(lowTemperature);

  // Remove the active class from the celcius link
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let fahrenheitTemperature = null;

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celciusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celciusTemperature);

  // Convert forecast temperatures
  let highTempElement = document.querySelector("forecastHigh");
  let lowTempElement = document.quertSelector("forecastLow");
  let cHighTemperature = ((highTemperature - 32) * 5) / 9;
  highTempElement.innerHTML = Math.round(cHighTemperature);
  let cLowTemperature = ((lowTemperature - 32) * 5) / 9;
  lowTemperatureElement.innerHTML = Math.round(cLowTemperature);

  // Remove the active class from the fahrenheit link
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
}
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

let highTemperature = null;
let lowTempearture = null;

searchCity("Tokyo");
