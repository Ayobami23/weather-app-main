import { fetchWeather } from "./api.js";

// Search Input and DOM Manipulation
function initializeSearch() {
  document.getElementById('search-button').addEventListener('click', async (e) => {
    e.preventDefault();
      const locationInput = document.getElementById('location').value;
      const fetchedResults = await fetchWeather(locationInput); 
      const { name, country, ...data } = fetchedResults;

    console.log(name, country, data);

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
    document.getElementById('temperature').textContent = `${tempValue}${tempUnit}`;

    // // To display the "feels like" temperature, humidity, wind speed, and precipitation
    
    document.getElementById('feels-like').textContent = `${apparent_tempValue}${apparent_tempUnit}`;
    document.getElementById('humidity').textContent = `${humidityValue}${humidityUnit}`;
    document.getElementById('wind').textContent = `${windspeedValue}${windspeedUnit}`;
    document.getElementById('precipitation').textContent = `${precipitationValue}${precipitationUnit}`;

    // console.log(data.current_units.temperature_2m);

  });
}

initializeSearch();
