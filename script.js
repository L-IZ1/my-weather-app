function showCity(event) {
  event.preventDefault(); 
  let cityInput = document.querySelector("#inputtype");
  let apiKey = "6f0ce0c2725766b7e6a344b9cd75a87a";
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${cityInput.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showRealTemp);
}

function getApiForecast(coordinates){
let apiKey = "6f0ce0c2725766b7e6a344b9cd75a87a";
let apiUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showForecast);
}

function showRealTemp(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let temperature = Math.round(celsiusTemperature);
  let cityParameter = document.querySelector("#searched-city");
  cityParameter.innerHTML = `${response.data.name}`;
  let temp = document.querySelector("#temp-measured");
  temp.innerHTML = `${temperature}`;
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
  axios.get(apiUrl).then(showLiveTemp);
}

function showLiveTemp(response) {  
 celsiusTemperature = response.data.main.temp;
 document.querySelector("#temp-measured").innerHTML = Math.round(celsiusTemperature);
 document.querySelector("#searched-city").innerHTML = response.data.name;  
 document.querySelector("#windy").innerHTML = Math.round(response.data.wind.speed);  
 document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity); 
 document.querySelector("#max-temp").innerHTML = Math.round(response.data.main.temp_max);  
 document.querySelector("#min-temp").innerHTML = Math.round(response.data.main.temp_min); 
 document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
 let iconElement = document.querySelector("#icon");
 iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
 iconElement.setAttribute("alt", response.data.weather[0].description);

 getApiForecast(response.data.coord);
}

function cityStart(cities) {
  let apiKey = "6f0ce0c2725766b7e6a344b9cd75a87a";
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${cities}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showLiveTemp);
}


function centigradesToFahrenheit(event) {
  event.preventDefault();
  let showTempFahrenheit = document.querySelector("#temp-measured");
  degrees.classList.remove("unites");
  fahrenheit.classList.add("units");
  let fahrenheitt = (celsiusTemperature * 9) / 5 + 32;
  showTempFahrenheit.innerHTML = Math.round(fahrenheitt);
}

function fahrenheitToCentigrades(event) {
  event.preventDefault();
  degrees.classList.add("unites");
  fahrenheit.classList.remove("units");
  let showTempCentigrades = document.querySelector("#temp-measured");
  showTempCentigrades.innerHTML = Math.round(celsiusTemperature);
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
<strong>${formatDayForecast(WeatherForecastDay.dt)}</strong><br /><img src="http://openweathermap.org/img/wn/${WeatherForecastDay.weather[0].icon}@2x.png" alt="" id="icon" class="icon-fforecast"/><br />
<div class= "forecast-temperature">
<i class="fa-solid fa-arrow-up max-forecast-temp"></i><span>${Math.round(WeatherForecastDay.temp.max)}°</span><i class="fa-solid fa-arrow-down min-forecast-temp"></i><span>${Math.round(WeatherForecastDay.temp.min)}°</span></div>
</div>
</div>
`;
}
  });
  forecastHtml = forecastHtml + ` </div> `;
  forecastElement.innerHTML = forecastHtml;
}

// Program flow

printDateinHTML();

// When interaction with

let celsiusTemperature= null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

let searchCurrentPlace = document.querySelector("#live-button");
searchCurrentPlace.addEventListener("click", showPlaceLive);

let selectFahrenheit = document.querySelector("#fahrenheit");
selectFahrenheit.addEventListener("click", centigradesToFahrenheit);

let selectDegrees = document.querySelector("#degrees");
selectDegrees.addEventListener("click", fahrenheitToCentigrades);

cityStart("Munich");

// showForecast();


