import { fetchWeather } from "./api.js";

// Search Input and DOM Manipulation
function initializeSearch() {
  document.getElementById('search-button').addEventListener('click', async (e) => {
    e.preventDefault();
      const locationInput = document.getElementById('location').value;
      const fetchedResults = await fetchWeather(locationInput); 
      const { name, country, ...data } = fetchedResults;

    // Data Object Destructuring
    // 1. raw numbers
const {
  apparent_temperature: apparent_tempValue,
  rain:                 rainValue,
  precipitation:        precipitationValue,
  relative_humidity_2m: humidityValue,
  temperature_2m:       tempValue,
  time:                 timeValue,
  wind_speed_10m:       windspeedValue,
  wind_direction_10m:   winddirectionValue
} = data.current;

// matching units
const {
  apparent_temperature: apparent_tempUnit,
  rain:                 rainUnit,
  precipitation:        precipitationUnit,
  relative_humidity_2m: humidityUnit,
  temperature_2m:       tempUnit,
  time:                 timeUnit,
  wind_speed_10m:       windspeedUnit,
  wind_direction_10m:   winddirectionUnit
} = data.current_units;
    
    // Manipulate the DOM to display the weather data (e.g., country name, temperature, etc.)
    
    // To display the country name
    if (name == country) {
      document.getElementById('country-name').textContent = `${name}`;
    } else {
      document.getElementById('country-name').textContent = `${name}, ${country}`;
    }

    // // To display the current date in a human-readable format
    const date = new Date(timeValue);
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    document.getElementById('current-date').textContent = formattedDate;

    // // To display the current temperature
    document.getElementById('temperature').textContent = `${Math.round(tempValue)}°`;

    // // To display the "feels like" temperature, humidity, wind speed, and precipitation
    
    document.getElementById('feels-like').textContent = `${Math.round(apparent_tempValue)}°`;
    document.getElementById('humidity').textContent = `${humidityValue}${humidityUnit}`;
    document.getElementById('wind').textContent = `${windspeedValue} ${windspeedUnit}`;
    document.getElementById('precipitation').textContent = `${precipitationValue} ${precipitationUnit}`;

    // Map 7-day forecast data to the DOM
    const forecastGrid = document.getElementById('forecast-grid');
    forecastGrid.innerHTML = ''; // Clear previous forecast data
    const forecastDaily = data.daily;
    
      forecastDaily.time.forEach((time, index) => {
        const forecastDay = document.createElement('div');
        // Assign a class to each forecast grid item based on the index (e.g., day1, day2, etc.)
        forecastDay.classList.add(`days`);
        // Format the date to display the day of the week
        const date = new Date(time);
        // Format the date to display the day of the week
        const options = { weekday: 'short' };
        const formattedDate = date.toLocaleDateString(undefined, options);
        // Get the maximum and minimum temperatures for the day
        const maxTemp = Math.round(forecastDaily.temperature_2m_max[index]);
        const minTemp = Math.round(forecastDaily.temperature_2m_min[index]);
        // Get the weather code for the day and determine the corresponding weather icon
        const weatherCode = forecastDaily.weather_code;
        let imgSrc; // Declaration of imgSrc variable to hold the path of the weather icon based on the weather code
          if (weatherCode[index] === 0) {
            imgSrc = './assets/images/icon-sunny.webp';
          } else if (weatherCode[index] === 1 || weatherCode[index] === 2 || weatherCode[index] === 3) {
            imgSrc = './assets/images/icon-partly-cloudy.webp';
          } else if (weatherCode[index] === 45 || weatherCode[index] === 48) {
            imgSrc = './assets/images/icon-fog.webp';
          } else if (weatherCode[index] === 51 || weatherCode[index] === 53 || weatherCode[index] === 55) {
            imgSrc = './assets/images/icon-drizzle.webp';
          } else if (weatherCode[index] === 61 || weatherCode[index] === 63 || weatherCode[index] === 65) {
            imgSrc = './assets/images/icon-rain.webp';
          } else if (weatherCode[index] === 71 || weatherCode[index] === 73 || weatherCode[index] === 75) {
            imgSrc = './assets/images/icon-snow.webp';
          } else if (weatherCode[index] === 77) {
            imgSrc = './assets/images/icon-snow.webp';
          } else if (weatherCode[index] === 80 || weatherCode[index] === 81 || weatherCode[index] === 82) {
            imgSrc = './assets/images/icon-rain.webp';
          } else if (weatherCode[index] === 85 || weatherCode[index] === 86) {
            imgSrc = './assets/images/icon-snow.webp';
          } else if (weatherCode[index] === 95 || weatherCode[index] === 96 || weatherCode[index] === 99) {
            imgSrc = './assets/images/icon-storm.webp';
          } else {
            imgSrc = './assets/images/overcast.webp';
          }

        // Populate the forecast grid with the formatted date, weather icon, and temperature values
        forecastDay.innerHTML = `
          <span>${formattedDate}</span>
          <img src="${imgSrc}">
          <div class="temp">
          <small>${maxTemp}°</small>
          <small>${minTemp}°</small>
          </div>
        `;
        forecastGrid.appendChild(forecastDay);
      });
  });
}

initializeSearch();
