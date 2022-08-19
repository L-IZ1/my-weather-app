function showCity(event) {
  event.preventDefault(); 
  let cityInput = document.querySelector("#inputtype");
  let apiKey = "6f0ce0c2725766b7e6a344b9cd75a87a";
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${cityInput.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showRealTemp);
}

function showRealTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityParameter = document.querySelector("#searched-city");
  cityParameter.innerHTML = `${response.data.name}`;
  let example = document.querySelector("#temperature");
  example.innerHTML = `${temperature}`;
  let maxt = Math.round(response.data.main.temp_max);
  let max = document.querySelector("#max-temp");
  max.innerHTML = `${maxt}`;
  let minitemp = Math.round(response.data.main.temp_min);
  let min = document.querySelector("#min-temp");
  min.innerHTML = `${minitemp}`;
  let humidities = Math.round(response.data.main.humidity);
  let humide = document.querySelector("#humidity");
  humide.innerHTML = `${humidities}`;
  let windspeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#windy");
  wind.innerHTML = `${windspeed}`;
}

function showPlaceLive(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "6f0ce0c2725766b7e6a344b9cd75a87a";
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showLiveTemp);
}

function showLiveTemp(response) {
 document.querySelector("#searched-city").innerHTML = response.data.name;
 document.querySelector("#temp-measured").innerHTML = Math.round(response.data.main.temp);  
 document.querySelector("#windy").innerHTML = Math.round(response.data.wind.speed);  
 document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity); 
 document.querySelector("#max-temp").innerHTML = Math.round(response.data.main.temp_max);  
 document.querySelector("#min-temp").innerHTML = Math.round(response.data.main.temp_min); 
 document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;
}

function centigradesToFahrenheit() {
  let tempCentigrades = 25;
  let fahrenheit = (tempCentigrades * 9) / 5 + 32;
  let showTempFahrenheit = document.querySelector("#temp-measured");
  showTempFahrenheit.innerHTML = `${fahrenheit}`;
}

function fahrenheitToCentigrades() {
  let showTempCentigrades = document.querySelector("#temp-measured");
  let tempCentigrades = 25;
  showTempCentigrades.innerHTML = `${tempCentigrades}`;
}

function printDateinHTML() {
  let currentTime = new Date();
  let time = document.querySelector("#live-date");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[currentTime.getDay()];
  let hours = String(currentTime.getHours()).padStart(2, `0`);
  let minutes = String(currentTime.getMinutes()).padStart(2, `0`);
  time.innerHTML = `${day} ${hours}:${minutes}`;
}

function cityStart(cities) {
  let apiKey = "6f0ce0c2725766b7e6a344b9cd75a87a";
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${cities}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showLiveTemp);
}


// Program flow

printDateinHTML();

// When interaction with
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

let selectFahrenheit = document.querySelector("#fahrenheit");
selectFahrenheit.addEventListener("click", centigradesToFahrenheit);

let selectDegrees = document.querySelector("#degrees");
selectDegrees.addEventListener("click", fahrenheitToCentigrades);

let searchCurrentPlace = document.querySelector("#second-button");
searchCurrentPlace.addEventListener("submit", showPlaceLive);

cityStart("Munich");