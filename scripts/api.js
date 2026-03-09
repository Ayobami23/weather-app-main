
// Converting the location name to coordinates using the Open-Meteo Geocoding API:

async function getCoordinates(place) {
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${place}`;
  const response = await fetch(geoUrl);
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    return {
        lat: data.results[0].latitude,
        lon: data.results[0].longitude,
        name: data.results[0].name,
        country: data.results[0].country
    };
  }
  throw new Error('Location not found');
}

// Function to fetch weather data using the Open-Meteo Weather API:

const URL1 = 'https://api.open-meteo.com/v1/forecast?';
const URL2 = '&daily=temperature_2m_max,temperature_2m_min,rain_sum,showers_sum,snowfall_sum,precipitation_sum,sunrise,sunset&hourly=temperature_2m,rain,showers,snowfall&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,wind_speed_10m,wind_direction_10m,rain&timezone=auto';

export async function fetchWeather(place) {
  const { lat, lon, name, country } = await getCoordinates(place);
  const weatherUrl = `${URL1}latitude=${lat}&longitude=${lon}${URL2}`;
  const response = await fetch(weatherUrl);
  const data = await response.json();
  return { ...data, name, country };
}