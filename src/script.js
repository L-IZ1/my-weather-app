
function showCity(event) {
  event.preventDefault(); 
  let cityInput = document.querySelector("#inputtype");
  let apiKey = "6f0ce0c2725766b7e6a344b9cd75a87a";
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${cityInput.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showLiveTemperature);
}

function getApiForecast(coordinates){
let apiKey = "6f0ce0c2725766b7e6a344b9cd75a87a";
let apiUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showForecast);
}

function showLiveTemperature(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let citySelector = document.querySelector("#searched-city");
  citySelector.innerHTML = `${response.data.name}`;
  let temperatureSelector = document.querySelector("#live-temperature");
  temperatureSelector.innerHTML = Math.round(celsiusTemperature);
  let maxTempSelector = document.querySelector("#max-temp");
  maxTempSelector.innerHTML = Math.round(response.data.main.temp_max);
  let minTempSelector = document.querySelector("#min-temp");
  minTempSelector.innerHTML = Math.round(response.data.main.temp_min);
  let humiditySelector = document.querySelector("#humidity");
  humiditySelector.innerHTML = Math.round(response.data.main.humidity);
  let windspeedSelector = document.querySelector("#windy");
  windspeedSelector.innerHTML = Math.round(response.data.wind.speed); 
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description; 
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt",response.data.weather[0].description)  

getApiForecast(response.data.coord);
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
  axios.get(apiUrl).then(showLiveTemperature);
}

function showLiveTemperature(response) {  
 celsiusTemperature = response.data.main.temp;

 document.querySelector("#live-temperature").innerHTML = Math.round(celsiusTemperature);
 document.querySelector("#searched-city").innerHTML = response.data.name;  
 document.querySelector("#windy").innerHTML = Math.round(response.data.wind.speed);  
 document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity); 
 document.querySelector("#max-temp").innerHTML = Math.round(response.data.main.temp_max);  
 document.querySelector("#min-temp").innerHTML = Math.round(response.data.main.temp_min); 
 document.querySelector("#live-date").innerHTML = printDateinHTML(response.data.dt*1000); 
 document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
 let iconElement = document.querySelector("#icon");
 iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
 iconElement.setAttribute("alt", response.data.weather[0].description);

 getApiForecast(response.data.coord);
}

function cityStart(city) {
  let apiKey = "6f0ce0c2725766b7e6a344b9cd75a87a";
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showLiveTemperature);
}

function centigradesToFahrenheit(event) {
  event.preventDefault();
  let showTempFahrenheit = document.querySelector("#live-temperature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitSymbol = (celsiusTemperature * 9) / 5 + 32;
  showTempFahrenheit.innerHTML = Math.round(fahrenheitSymbol);
}

function fahrenheitToCentigrades(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let showTempCentigrades = document.querySelector("#live-temperature");
  showTempCentigrades.innerHTML = Math.round(celsiusTemperature);
}

function printDateinHTML(timestamp) {
  let currentTime = new Date(timestamp);

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
  return `${day} ${hours}:${minutes}`;
}

function formatDayForecast(timestamp){
let date= new Date(timestamp * 1000);
let day = date.getDay();
let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
return days[day];
}

function showForecast (response){
let forecastDaily= response.data.daily;
let forecastElement = document.querySelector("#weather-forecast");
let forecastHtml = `<div class="row">`;
forecastDaily.forEach(function(WeatherForecastDay, index){
if (index <6){
forecastHtml = forecastHtml + 
`<div class="col-2">
<div class="forecast-text">
<strong>${formatDayForecast(WeatherForecastDay.dt)}</strong><br /><img src="http://openweathermap.org/img/wn/${WeatherForecastDay.weather[0].icon}@2x.png" alt="" id="icon" class="icon-for-forecast"/>
<div class= "forecast-temperature"><i class="fa-solid fa-arrow-up max-forecast-temp"></i><span>${Math.round(WeatherForecastDay.temp.max)}°</span><i class="fa-solid fa-arrow-down min-forecast-temp"></i><span>${Math.round(WeatherForecastDay.temp.min)}°</span></div>
</div>
</div>
`;
}
  });
  forecastHtml = forecastHtml + ` </div> `;
  forecastElement.innerHTML = forecastHtml;
}

let celsiusTemperature= null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

let searchCurrentPlace = document.querySelector("#live-button");
searchCurrentPlace.addEventListener("click", showPlaceLive);

let selectFahrenheit = document.querySelector("#fahrenheit");
selectFahrenheit.addEventListener("click", centigradesToFahrenheit);

let selectDegrees = document.querySelector("#celsius");
selectDegrees.addEventListener("click", fahrenheitToCentigrades);

printDateinHTML();

cityStart("Munich");




